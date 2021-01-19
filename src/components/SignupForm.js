import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock, faPortrait } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'
import Button from './Button'
import Alert from './Alert'
import {
  SignupFormStyle,
  TitleContainerStyle,
  TitleStyle,
  InputContainerStyle,
  InputContainerStyleBottom,
  InputStyle, 
  IconStyle,
  IconStyleYellow,
  SubmitButton,
  InformationBottom,
  LoginStyle
  } from '../css/LoginSignupStyle.js'


const querySignup = gql`
  mutation userCreate($user: UserInput!) {
    userCreate(userInput: $user) {
      id
      name
      username
    }
  }
`

const queryLogin = gql`
  mutation userLogin($user: UserInputLogin!) {
    userLogin(userInputLogin: $user) {
      value
      userId
    }
  }
`

const SignupForm = ({setUser, setCookie}) => {
  const [newName, setNewName] = useState('')
  const [newUsername, setNewUsername] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [messages, setMessages] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleUsernameChange = (event) => {
    setNewUsername(event.target.value)
  }
  const handlePasswordChange = (event) => {
    setNewPassword(event.target.value)
  }
  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value)
  }


  const [addUser, {error}] = useMutation(querySignup, {
    fetchPolicy: "no-cache",
    errorPolicy: "none",
    variables: {"user": {"name": `${newName}`, "username": `${newUsername}`, "password": `${newPassword}`, "passwordConfirm": `${confirmPassword}`}},
    onCompleted: (data) => {
      setUser(data.userCreate)
    },
    onError: (error) => {
      if (error.message.includes('unique')) {
        setMessages(['Username is already taken. Please choose another one.'])
      }
    }
  })
 

  const [loginUser] = useMutation(queryLogin, {
    variables: { "user": { "username": `${newUsername}`, "password": `${newPassword}`}},
    fetchPolicy: "no-cache",
    errorPolicy: "none",
    onCompleted: (data) => {
      setCookie('token', data.userLogin.value, {path: '/'})
    },
    onError: (error) => {
    } 
  })


  const handleSubmit = async (event) => {
    event.preventDefault()
    let messages = []

    if (newName.length < 3 ) {
      messages.push('Name is too short. The minimum length is 3 characters.')
    } 

    if (newUsername.length < 3) {
      messages.push('Username is too short. The minimum length is 3 characters.')
    }

    if (newPassword.length < 6) {
      messages.push('Password is too short. The minimum length is 6 characters.')
    } else if (confirmPassword !== newPassword) {
      messages.push('Passwords are not identical. Plase try again.')
    }

    setMessages(messages)
 
    if (messages.length === 0) {
      await addUser()
      loginUser()  
    }
  }

  

  return (
    <div style={SignupFormStyle}>
      <form onSubmit={handleSubmit}>
        <div style={TitleContainerStyle}>
          <h1 style={TitleStyle}>Create a new Account</h1>
        </div>
        <div style={InputContainerStyle }>
          <FontAwesomeIcon style={ newName.length >= 3? IconStyleYellow : IconStyle } icon={faPortrait}/>
          <input style={InputStyle} value={newName} placeholder='Name' onChange={handleNameChange} />
        </div>
        <div style={InputContainerStyle }>
          <FontAwesomeIcon style={ newUsername.length >=3? IconStyleYellow : IconStyle } icon={faUser}/>
          <input style={InputStyle} value={newUsername} placeholder='Username' onChange={handleUsernameChange} />
        </div>
        <div style={InputContainerStyle}>
          <FontAwesomeIcon style={ newPassword.length >= 6? IconStyleYellow : IconStyle } icon={faLock}/>
          <input style={InputStyle} type='password' value={newPassword} placeholder='Password' onChange={handlePasswordChange} />
        </div>
        <div style={InputContainerStyleBottom}>
          <FontAwesomeIcon style={ (confirmPassword === newPassword) && newPassword.length >=6 ? IconStyleYellow : IconStyle } icon={faLock}/>
          <input style={InputStyle} type='password' value={confirmPassword} placeholder='Confirm Password' onChange={handleConfirmPasswordChange} />
        </div>
        <div style={SubmitButton}>
          <Button text="Submit" />
        </div>
      </form>
      <Alert messages={messages} />
      <div style={InformationBottom}>
        <NavLink style={LoginStyle} to='/login'>Already have an Account? Log in </NavLink>
      </div>
    </div>
  )
}

export default SignupForm