const UserWrapper = (() => {
  let userId =''
 
  const getUserId = () => {
    return userId
  }

  const setUserId = (id) => {
    userId = id
  }

  return {
    getUserId,
    setUserId
  }

})()

export default UserWrapper