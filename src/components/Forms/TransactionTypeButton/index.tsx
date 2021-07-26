import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { 
  Container,
  Icon,
  Title,
} from './styles';

const icons = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle'
}

interface Props extends TouchableOpacityProps {
  type: 'up' | 'down';
  title: string;
  isActive: boolean;
}

export function TransactionTypeButton({
  title,
  type,
  isActive,
  ...rest
}:Props) {
  return (
    <Container {...rest} isActive={isActive} type={type}>
      <Icon
        type={type}
        name={icons[type]}
      />
      <Title>
        {title}
      </Title>
    </Container>
  )
}