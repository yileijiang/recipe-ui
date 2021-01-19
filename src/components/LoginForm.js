import React, { useState } from 'react'
import { gql, useMutation }  from '@apollo/client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from 'react-router'
import Button from './Button'
import Alert from './Alert'
import UserWrapper from '../UserWrapper'
import { NavLink } from 'react-router-dom'
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
  const [messages, setMessages] = useState('')
  let history = useHistory()

  const handleUsernameChange = (event) => {
    setNewUsername(event.target.value)
  }
  const handlePasswordChange = (event) => {
    setNewPassword(event.target.value)
  }

  const [loginUser, { data }] = useMutation(query, {
    variables: { "user": { "username": `${newUsername}`, "password": `${newPassword}`}},
    fetchPolicy: "no-cache",
    errorPolicy: "none",
    onCompleted: (data) => {
      setCookie('token', data.userLogin.value, {path: '/'})
      UserWrapper.setUserId(data.userLogin.userId)
      history.push(`/profile`)
    },
    onError: (error) => {
      setMessages(["Log in not sucessful. Username or passwrong is wrong"])
    }
  })

  
  const handleSubmit = (event) => {
    event.preventDefault()
    let messages = []

    if (!newUsername) {
      messages.push('Please enter your username')
    } 

    if (!newPassword) {
      messages.push('Please enter your password')
    }

    setMessages(messages)
 
    if (messages.length === 0) {
      loginUser()  
    }
  }

  return (
    <div style={SignupFormStyle}>
      <form onSubmit={handleSubmit}>
        <div style={TitleContainerStyle}>
          <h1 style={TitleStyle}>Log In to your Account</h1>
        </div>
        <div style={ InputContainerStyle }>
          <FontAwesomeIcon style={ newUsername? IconStyleYellow : IconStyle } icon={faUser}/>
          <input style={InputStyle} value={newUsername} placeholder='Username' onChange={handleUsernameChange} />
        </div>
        <div style={ InputContainerStyleBottom }>
          <FontAwesomeIcon style={ newPassword? IconStyleYellow : IconStyle } icon={faLock}/>
          <input style={InputStyle} value={newPassword} type='password' placeholder='Password' onChange={handlePasswordChange} />
        </div>
        <div style={SubmitButton}>
          <Button text="Log In" />
        </div>
      </form>
      <Alert messages={messages} />
      <div style={InformationBottom}>
        <NavLink style={LoginStyle} to='/signup'>Don't have an Account? Sign up </NavLink>
      </div>
    </div>
  )
}

export default LoginForm