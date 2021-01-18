import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock, faPortrait } from '@fortawesome/free-solid-svg-icons'
import Button from './Button'
import { NavLink } from 'react-router-dom'
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
  const [message, setMessage] = useState('')

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

  const [addUser] = useMutation(querySignup, {
    fetchPolicy: "no-cache",
    variables: {"user": {"name": `${newName}`, "username": `${newUsername}`, "password": `${newPassword}`}},
    onCompleted: (data) => {
      setUser(data.userCreate)
    }
  })

  const [loginUser] = useMutation(queryLogin, {
    variables: { "user": { "username": `${newUsername}`, "password": `${newPassword}`}},
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
      setCookie('token', data.userLogin.value, {path: '/'})
    }
  })

  const handleSubmit = async (event) => {
    event.preventDefault()
    if(confirmPassword !== newPassword) {
      setMessage('passwords are not identical. Plase try again.')
      setTimeout(() => setMessage(''), 5000)
      setNewPassword('')
      setConfirmPassword('')
    } else {
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
          <FontAwesomeIcon style={ newName? IconStyleYellow : IconStyle } icon={faPortrait}/>
          <input style={InputStyle} value={newName} placeholder='Name' onChange={handleNameChange} />
        </div>
        <div style={InputContainerStyle }>
          <FontAwesomeIcon style={ newUsername? IconStyleYellow : IconStyle } icon={faUser}/>
          <input style={InputStyle} value={newUsername} placeholder='Username' onChange={handleUsernameChange} />
        </div>
        <div style={InputContainerStyle}>
          <FontAwesomeIcon style={ newPassword? IconStyleYellow : IconStyle } icon={faLock}/>
          <input style={InputStyle} type='password' value={newPassword} placeholder='Password' onChange={handlePasswordChange} />
        </div>
        <div style={InputContainerStyleBottom}>
          <FontAwesomeIcon style={ (confirmPassword === newPassword) && newPassword ? IconStyleYellow : IconStyle } icon={faLock}/>
          <input style={InputStyle} type='password' value={confirmPassword} placeholder='Confirm Password' onChange={handleConfirmPasswordChange} />
        </div>
        <div style={SubmitButton}>
          <Button text="Submit" />
        </div>
      </form>
      <Alert message={message} />
      <div style={InformationBottom}>
        <NavLink style={LoginStyle} to='/login'>Already have an Account? Log in </NavLink>
      </div>
    </div>
  )
}

export default SignupForm