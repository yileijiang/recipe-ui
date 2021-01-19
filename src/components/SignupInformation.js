const SignupInformation = ({user}) => {
  const SignupInformationStyle = {
    color: 'blue',
    margin: '2rem 3rem'
  }

 

  if(!user) {
    return (
      <></>
    )
  } else {
    return(
      <div style={SignupInformationStyle}>
        <p> Welcome {user.name}! </p>
        You have sucessfully signed up. Your username is {user.username}.
        <br/>
        Get started now:

      </div>
    )
  }
}

export default SignupInformation 