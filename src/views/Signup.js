import React, { useState } from 'react'
import SignupForm from '../components/SignupForm'
import SignupInformation from '../components/SignupInformation'

const Signup = ({setCookie}) => {
  const [user, setUser] = useState(null)

  if(user) {
    return (
      <SignupInformation user={user} />
    )

  } else {
    return (
      <SignupForm setUser={setUser} setCookie={setCookie} />
     )
  }
 
}

export default Signup