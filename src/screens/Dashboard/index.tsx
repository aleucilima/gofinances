import React from 'react'
import { HighlightCard } from '../../components/HighlightCard'

import { 
    Container,
    Header,
    UserContainer,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    UserName,
    Icon,
    HighlightCards
} from './styles'

export function Dashboard() {
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
          <Icon name="power" />
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
    </Container>
  )
}

