import { gql } from '@apollo/client'
import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { Button, Form, Container } from 'semantic-ui-react'

import { useForm } from '../utils/hooks'

const Login = ({ history }) => {
  const [errors, setErrors] = useState({})

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    username: '',
    password: '',
  })

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, result) {
      history.push('/')
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors)
    },
    variables: values,
  })

  function loginUserCallback() {
    loginUser()
  }

  return (
    <Container style={{ width: 400 }}>
      <Form onSubmit={onSubmit} noValidate className={loading ? '1' : ''}>
        <h1>Login</h1>
        <Form.Input
          label='Username'
          placeholder='Username...'
          name='username'
          type='text'
          value={values.username}
          error={errors.username ? true : false}
          onChange={onChange}
        />
        <Form.Input
          label='Password'
          placeholder='Password...'
          name='password'
          type='password'
          value={values.password}
          error={errors.password ? true : false}
          onChange={onChange}
        />
        <Button type='submit' primary>
          Login
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className='ui error message'>
          <ul className='list'>
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </Container>
  )
}

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`

export default Login
