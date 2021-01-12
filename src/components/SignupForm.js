import React, { useState } from 'react'
import Button from './Button'
import UserInformation from './UserInformation'
import { gql, useMutation } from '@apollo/client'


const SignupForm = () => {
  const [newName, setNewName ] = useState('')
  const [newUsername, setNewUsername ] = useState('')
  const [newPassword, setNewPassword ] = useState('')
  let newUser = null

  const query = gql`
  mutation {
    userAdd(userInput: { name: "${newName}", username: "${newUsername}", password: "${newPassword}" }) {
      id
      name
      username
    }
  }
  `

  const [ addUser, { data } ] = useMutation(query, {
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
      console.log(data)
    }
  })

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleUsernameChange = (event) => {
    setNewUsername(event.target.value)
  }
  const handlePasswordChange = (event) => {
    setNewPassword(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    addUser()
  }

  if (data) {
    newUser = data.userAdd
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        name
        <input value={newName} onChange={handleNameChange} /> <br/>
        username
        <input value={newUsername} onChange={handleUsernameChange} /> <br/>
        password
        <input value={newPassword} onChange={handlePasswordChange} />
        <Button text="Signup" />
      </form>
      <UserInformation user={newUser} />
    </div>

  )
}

export default SignupForm