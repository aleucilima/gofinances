import React, { useState } from 'react'

import { Input } from '../../components/Form/Input'
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton'
import { Button } from '../../components/Form/Button'

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsTypes,
} from './styles'

export function Register() {
  const [transactionType, setTransactionType] = useState('')

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <Input
            placeholder='Nome'
          />
          <Input
            placeholder='Preço'
          />

          <TransactionsTypes>
            <TransactionTypeButton 
              title='Income'
              type='up'
            />
            <TransactionTypeButton 
              title='Outcome'
              type='down'
            />
          </TransactionsTypes>
        </Fields>
        <Button 
          title='Enviar'
        />
      </Form>
    </Container>
  )
}