import React from 'react';

import { HistoryCard } from '../../components/HistoryCard';



import {
  Container,
  Header,
  Title,
} from './styles';

export function Resume() {
  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      <HistoryCard 
        title="Alimentação"
        amount="R$ 100,00"
        color="#F5534F"
      />

    </Container>
  )
}