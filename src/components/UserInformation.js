const UserInformation = ({user}) => {
  if(!user) {
    return (
      <>
      </>
    )
  } else {
    return(
      <div>
        Sucessfully signed up!
        {user.name}
        {user.username}
      </div>
    )
  }
}

export default UserInformation 