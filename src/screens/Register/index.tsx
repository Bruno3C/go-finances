import React from 'react';
import { useState } from 'react';
import { Button } from '../../components/Forms/Button';
import { CategorySelect } from '../../components/Forms/CategorySelect';
import { Input } from '../../components/Forms/Input';
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton';

import { 
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionTypes
} from './styles';

export function Register() {
  const [ transactionType, setTransactionType ] = useState('');

  function handleTransactionsTypeSelect(type: 'up' | 'down') {
    setTransactionType(type);
  }


  return(
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>
      <Form>
        <Fields>
          <Input placeholder="Nome" />
          <Input placeholder="Preço" />

          <TransactionTypes>
            <TransactionTypeButton 
              type="up"
              title="Income"
              isActive={transactionType === 'up'}
              onPress={() => handleTransactionsTypeSelect('up')}
            />
            <TransactionTypeButton 
              type="down"
              title="Outcome"
              isActive={transactionType === 'down'}
              onPress={() => handleTransactionsTypeSelect('down')}
            />
          </TransactionTypes>

          <CategorySelect title="Categoria" />

        </Fields>
        <Button title="Enviar" />
      </Form>
    </Container>
  )
}