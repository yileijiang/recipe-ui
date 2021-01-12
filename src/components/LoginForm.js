import React, { useState } from 'react'
import { gql, useMutation }  from '@apollo/client'
import { useCookies } from 'react-cookie'
import Button from './Button'

const LoginForm = () => {
  const [ newUsername, setNewUsername ] = useState('')
  const [ newPassword, setNewPassword ] = useState('')
  const [ cookies, setCookie ] = useCookies(['user'])

  const query = gql`
    mutation {
      userLogin(userInputLogin: { username: "${newUsername}", password: "${newPassword}" }) {
        value
      }
    }
  `
  const [loginUser, { data }] = useMutation(query, {
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
      console.log(data)
      setCookie('token', data.userLogin.value, {path: '/'})
    }
  })

  const handleUsernameChange = (event) => {
    setNewUsername(event.target.value)
  }
  const handlePasswordChange = (event) => {
    setNewPassword(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    loginUser() 
  }


  return (
    <div>
      <form onSubmit={handleSubmit}>
        username
        <input value={newUsername} onChange={handleUsernameChange} /> <br/>
        password
        <input value={newPassword} onChange={handlePasswordChange} />
        <Button text="Signup" />
      </form>
    </div>
  )
}

export default LoginForm