import React, { useState } from 'react'
import { Modal } from 'react-native'
import { useForm } from 'react-hook-form'

import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton'
import { CategorySelectButton } from '../../components/Form/CategorySelectButton'
import { Button } from '../../components/Form/Button'
import { InputForm } from '../../components/Form/InputForm'

import { CategorySelect } from '../CategorySelect'

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsTypes,
} from './styles'

interface FormData {
  [name: string]: any
}

export function Register() {
  const [transactionType, setTransactionType] = useState('')
  const [categoryModalOpen, setCategoryModalOpen] = useState(false)
  
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria'
  })

  const { 
    control,
    handleSubmit,
  } = useForm()

  function handleTransactionsTypeSelect(type: 'up' | 'down') {
    setTransactionType(type)
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true)
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false)
  }

  function handleRegister(form: FormData) {
    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key
    }

    console.log(data)
  }

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <InputForm
            name="name"
            control={control}
            placeholder='Nome'
          />
          <InputForm
            name="amount"
            control={control}
            placeholder='Preço'
          />

          <TransactionsTypes>
            <TransactionTypeButton 
              title='Income'
              type='up'
              onPress={() => handleTransactionsTypeSelect('up')}
              isActive={transactionType === 'up'}
            />
            <TransactionTypeButton 
              title='Outcome'
              type='down'
              onPress={() => handleTransactionsTypeSelect('down')}
              isActive={transactionType === 'down'}
            />
          </TransactionsTypes>

          <CategorySelectButton
            title={category.name}
            onPress={handleOpenSelectCategoryModal}
          />
        </Fields>
        
        <Button 
          title='Enviar'
          onPress={handleSubmit(handleRegister)}
        />
      </Form>

      <Modal 
        visible={categoryModalOpen}
        statusBarTranslucent
      >
        <CategorySelect 
          category={category}
          setCategory={setCategory}
          closeSelectCategory={handleCloseSelectCategoryModal}
        />
      </Modal>
    </Container>
  )
}