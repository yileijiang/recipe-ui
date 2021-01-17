import { NavLink } from 'react-router-dom'
import UserWrapper from '../UserWrapper'
import LogoutButton from './LogoutButton'
import { useHistory } from 'react-router'
import '../css/Navbar.css'



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
      <div><NavLink className='NavbarLink NavbarLinkYellow' activeClassName='NavbarActiveLink' to='/newRecipe'>New Recipe</NavLink></div>
      <div className='push'><LogoutButton text='Log Out' onClick={logout}/></div>
      <div><NavLink className='NavbarButton' activeClassName='NavbarActiveButton' activeStyle={{backgroundColor: '#f19009'}} to='/profile'>My Profile</NavLink></div>
    </>
  )
}


const NavbarAll = () => {
  return (
    <>
     <div className='push'><NavLink className='NavbarLink NavbarLinkBlack' activeClassName='NavbarActiveLink' to='/login'>Log In</NavLink></div>
    <div><NavLink className='NavbarButton' activeClassName='NavbarActiveButton' activeStyle={{backgroundColor: '#f19009'}} to='/signup'>Sign Up</NavLink></div>
    </>
  )

}


const Navbar = ({removeCookie}) => {

  const loggedin = document.cookie.includes('token') 

  return (
    <div id='Navbar'>
      <div><NavLink exact to ='/home' activeClassName='NavbarActiveLink' className='NavbarLink NavbarLinkYellow' to='/'>Home</NavLink></div>
      <div><NavLink className='NavbarLink NavbarLinkYellow' activeClassName='NavbarActiveLink' to='/recipes'>All Recipes</NavLink></div>
      {loggedin && NavBarUser(removeCookie)}
      {!loggedin && NavbarAll()}
    </div>
  )

}

export default Navbar