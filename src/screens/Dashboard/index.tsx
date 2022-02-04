import React from 'react'

import { HighlightCard } from '../../components/HighlightCard'
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard'

import { 
    Container,
    Header,
    UserContainer,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    UserName,
    LogoutButton,
    Icon,
    HighlightCards,
    Transactions,
    Title,
    TransactionsList,
} from './styles'

 export interface DataListProps extends TransactionCardProps {
  id: string;
}

export function Dashboard() {
  const data: DataListProps[] = [
    {
      id: '1',
      type: 'positive',
      title:"Desenvolvimento de site",
      amount:"R$ 1.000,00",
      category: {
        name: 'Vendas',
        icon: 'dollar-sign',
      },
      date: "13/04/2021"
    },
    {
      id: '2',
      type: 'negative',
      title:"Pizza",
      amount:"R$ 59,00",
      category: {
        name: 'Alimentação',
        icon: 'coffee',
      },
      date: "13/04/2021"
    },
    {
      id: '3',
      type: 'negative',
      title:"Aluguel do apartamento",
      amount:"R$ 1.000,00",
      category: {
        name: 'Casa',
        icon: 'shopping-bag',
      },
      date: "13/04/2021"
    }
  ]

  return (
    <Container>
      <Header>
        <UserContainer>
          <UserInfo>
            <Photo source={{ uri: 'http://github.com/aleucilima.png'}}/>
            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>Alê</UserName>
            </User>
          </UserInfo>
          <LogoutButton onPress={() => {}}>
            <Icon name="power" />
          </LogoutButton>
        </UserContainer>
      </Header>
      <HighlightCards>
        <HighlightCard
          type='up' 
          title="Entradas"
          amount="R$ 14.000,00"
          lastTransaction="Hoje"
        />
        <HighlightCard 
          type='down'
          title="Saídas"
          amount="R$ 10.000,00"
          lastTransaction="Hoje"
        />
        <HighlightCard 
          type='total'
          title="Total"
          amount="R$ 4.000,00"
          lastTransaction="Hoje"
        />
      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title>

        <TransactionsList 
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
        
      </Transactions>
    </Container>
  )
}

