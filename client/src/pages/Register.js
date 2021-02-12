import { gql } from '@apollo/client'
import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { Button, Form, Container } from 'semantic-ui-react'

const Register = () => {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, result) {
      console.log(result)
    },
    variables: values,
  })

  const onChange = (e) => {
    setValues(...values, { [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    addUser()
  }

  return (
    <Container style={{ width: 400 }}>
      <Form onSubmit={onSubmit} noValidate>
        <h1>Register</h1>
        <Form.Input
          label='Username'
          placeholder='Username...'
          name='username'
          value={values.username}
          onChange={onChange}
        />
        <Form.Input
          label='Email'
          placeholder='Email...'
          name='email'
          value={values.email}
          onChange={onChange}
        />
        <Form.Input
          label='Password'
          placeholder='Password...'
          name='password'
          value={values.password}
          onChange={onChange}
        />
        <Form.Input
          label='Confirm Password'
          placeholder='Confirm Password...'
          name='confirmPassword'
          value={values.confirmPassword}
          onChange={onChange}
        />
        <Button type='submit' primary>
          Register
        </Button>
      </Form>
    </Container>
  )
}

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`

export default Register
