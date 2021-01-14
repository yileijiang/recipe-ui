import { Link } from 'react-router-dom'
import UserWrapper from '../UserWrapper'
import Button from './Button'
import { useHistory } from 'react-router'



const NavBarUser = (removeCookie) => {

  let history = useHistory()

  const logout = () => {
    removeCookie('token')
    UserWrapper.setUserId(null)
    // TODO: APOLLO CLEAR CACHE
    history.push(`/`)
  }

  return (
    <>
      <Link to='/newRecipe'>New Recipe</Link>
      <Link to='/profile'>My Profile</Link>
      <Button text='Log Out' onClick={logout}/>
    </>
  )
}



const NavbarAll = () => {
  return (
    <>
      <Link to='/signup'>Sign Up</Link>
      <Link to='/login'>Log In</Link>
    </>
  )

}


const Navbar = ({removeCookie}) => {
  const loggedin = document.cookie.includes('token') 

  return (
    <>
      <Link to='/'>Home</Link>
      <Link to='/recipes'>All Recipes</Link>
      {loggedin && NavBarUser(removeCookie)}
      {!loggedin && NavbarAll()}
    </>
  )

}

export default Navbar