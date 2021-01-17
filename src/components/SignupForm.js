import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock, faPortrait } from '@fortawesome/free-solid-svg-icons'
import Button from './Button'
import SignupInformation from './SignupInformation'
import { NavLink } from 'react-router-dom'

const SignupFormStyle = {
  margin: 'auto',
  borderRadius: '10px',
  boxShadow: '1px 0px 10px 1px rgba(0,0,0,0.3)',
  height: '40rem',
  width: '30rem',
  backgroundColor: 'white',
  position: 'relative',
}

const TitleContainerStyle = {
  textAlign: 'center',
  padding: '4rem'
}

const TitleStyle = {
  color: '#303036',
  fontFamily: 'Roboto',
  fontWeight: '300',
  margin: '0'
}

const InputContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  backgroundColor: 'rgba(0,0,0,0.1)',
  borderTop: '1px solid rgba(0,0,0,0.2)',
  padding: '0 3rem'
}

const InputContainerStyleBottom = {
  display: 'flex',
  alignItems: 'center',
  backgroundColor: 'rgba(0,0,0,0.1)',
  borderTop: '1px solid rgba(0,0,0,0.2)',
  borderBottom: '1px solid rgba(0,0,0,0.2)',
  padding: '0 3rem'
}

const InputStyle = {
  backgroundColor: 'transparent',
  width: '100%',
  height: '2rem',
  border: 'none',
  outline: 'none',
  color: '#303036',
  fontFamily: 'Roboto',
  fontWeight: '300'
}


const IconStyle = {
  color: 'rgba(0,0,0,0.3)',
  marginRight: '1rem'
}

const IconStyleYellow = {
  color: '#FF9505',
  marginRight: '1rem'
}

const SubmitButton = {
  margin: '1.5rem 2.8rem'
}

const InformationBottom = {
  position: 'absolute',
  bottom: '2rem',
  left: '25%'
}
 
const LoginStyle = {
  color: 'rgba(0,0,0,0.3)',
  fontWeight: '300',
  fontFamily: 'Roboto',
  fontSize: '1rem'
}

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
    <div style={SignupFormStyle}>
      <form onSubmit={handleSubmit}>
        <div style={TitleContainerStyle}>
          <h1 style={TitleStyle}>Create a new Account</h1>
        </div>
        <div style={ InputContainerStyle }>
          <FontAwesomeIcon style={ newName? IconStyleYellow : IconStyle } icon={faPortrait}/>
          <input style={InputStyle} value={newName} placeholder='Name' onChange={handleNameChange} />
        </div>
        <div style={ InputContainerStyle }>
          <FontAwesomeIcon style={ newUsername? IconStyleYellow : IconStyle } icon={faUser}/>
          <input style={InputStyle} value={newUsername} placeholder='Username' onChange={handleUsernameChange} />
        </div>
        <div style={ InputContainerStyleBottom}>
          <FontAwesomeIcon style={ newPassword? IconStyleYellow : IconStyle } icon={faLock}/>
          <input style={InputStyle} value={newPassword} placeholder='Password' onChange={handlePasswordChange} />
        </div>
        <div style={SubmitButton}>
          <Button text="Submit" />
        </div>
      </form>
      <SignupInformation user={newUser} />
      <div style={InformationBottom}>
        <NavLink style={LoginStyle} to='/login'>Already have an Account? Log in </NavLink>
      </div>
    </div>

  )
}

export default SignupForm