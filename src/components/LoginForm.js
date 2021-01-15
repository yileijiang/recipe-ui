import React, { useState } from 'react'
import { gql, useMutation }  from '@apollo/client'
import { useHistory } from 'react-router'
import Button from './Button'
import UserWrapper from '../UserWrapper'

const query = gql`
mutation sendUserData($user: UserInputLogin!) {
  userLogin(userInputLogin: $user) {
    value
    userId
  }
}
`

const LoginForm = ({setCookie}) => {
  const [ newUsername, setNewUsername ] = useState('')
  const [ newPassword, setNewPassword ] = useState('')
  let history = useHistory()

  const [loginUser, { data }] = useMutation(query, {
    variables: { "user": { "username": `${newUsername}`, "password": `${newPassword}`}},
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
      setCookie('token', data.userLogin.value, {path: '/'})
      UserWrapper.setUserId(data.userLogin.userId)
      history.push(`/profile`)
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
        <Button text="Login" />
      </form>
    </div>
  )
}

export default LoginForm