import React, { useState } from 'react'
import { gql, useMutation }  from '@apollo/client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from 'react-router'
import Button from './Button'
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
          <input style={InputStyle} value={newPassword} placeholder='Password' onChange={handlePasswordChange} />
        </div>
        <div style={SubmitButton}>
          <Button text="Log In" />
        </div>
      </form>
      <div style={InformationBottom}>
        <NavLink style={LoginStyle} to='/signup'>Don't have an Account? Sign up </NavLink>
      </div>
    </div>
  )
}

export default LoginForm