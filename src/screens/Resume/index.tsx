import React,{ useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VictoryPie } from 'victory-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { addMonths, format, subMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import {  useTheme } from 'styled-components';

import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import { HistoryCard } from '../../components/HistoryCard';

import {
  Container,
  Header,
  Title,
  Content,
  ChartContainer,
  MonthSelect,
  MountSelectButton,
  MonthSelectIcon,
  Month,
} from './styles';
import { categories } from '../../utils/categories';
import { useState } from 'react';

interface TransactionData {
  type: 'positive' | 'negative';
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface CategoryData {
  key: string;
  name: string;
  totalFormatted: string;
  total: number;
  percent: string;
  color: string;
}

export function Resume() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);

  const theme = useTheme();

  function handleDateChange(action: 'next' | 'prev') {
    if(action === 'next') {
      setSelectedDate(addMonths(selectedDate, 1));
    } else {
      setSelectedDate(subMonths(selectedDate, 1));
    }
  }

  async function loadData() {
    const dataKey = '@gofinances:transactions';
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted: TransactionData[] = response ? JSON.parse(response) : [];

    const expensives = responseFormatted.
      filter(expensive => expensive.type === 'negative' &&
        new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
        new Date(expensive.date).getFullYear() === selectedDate.getFullYear()
      );

    const expensivesTotal = expensives
      .reduce((acumullator: number, expensive: TransactionData) => {
        return acumullator + Number(expensive.amount);
      }, 0)

    const totalByCategory: CategoryData[] = [];

    categories.forEach(category => {
      let categorySum = 0;

      expensives.forEach((expensive) => {
        if(expensive.category === category.key) {
          categorySum += Number(expensive.amount);
        }
      });

      if(categorySum > 0){
        const totalFormatted = categorySum.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        });

        const percent = `${(categorySum / expensivesTotal * 100).toFixed(0)}%`;


        totalByCategory.push({
          key: category.key,
          name: category.name,
          total: categorySum,
          totalFormatted: totalFormatted,
          percent,
          color: category.color,
        });
      }

    });

    setTotalByCategories(totalByCategory);
    
  }

  useEffect(() => {
    loadData();
  },[selectedDate])

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>
      <Content 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingBottom: useBottomTabBarHeight()
        }}
      >
        <MonthSelect>
          <MountSelectButton onPress={() => handleDateChange('prev')}>
            <MonthSelectIcon name="chevron-left"/>
          </MountSelectButton>

          <Month>{ format(selectedDate, 'MMMM, yyyy', { locale: ptBR })}</Month>

          <MountSelectButton onPress={() => handleDateChange('next')}>
            <MonthSelectIcon name="chevron-right"/>
          </MountSelectButton>
        </MonthSelect>
        <ChartContainer>
          <VictoryPie 
            data={totalByCategories}
            colorScale={totalByCategories.map(category => category.color)}
            style={{
              labels: {
                fontSize: RFValue(18),
                fontWeight: 'bold',
                fill: theme.colors.shape
              }
            }}
            labelRadius={50}
            x="percent"
            y="total"
          /> 
        </ChartContainer>

        {
          totalByCategories.map(item => (
            <HistoryCard
              key={item.key}
              color={item.color}
              title={item.name}
              amount={item.totalFormatted}
            />
          ))
        }
      </Content>

    </Container>
  );
}