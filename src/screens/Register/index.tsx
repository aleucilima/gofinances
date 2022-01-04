import React from 'react'

import { Input } from '../../components/Form/Input'
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton'
import { Button } from '../../components/Form/Button'

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
} from './styles'

export function Register() {
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

          <TransactionTypeButton 
            title='Income'
            type='up'
          />
        </Fields>
        <Button 
          title='Enviar'
        />
      </Form>
    </Container>
  )
}