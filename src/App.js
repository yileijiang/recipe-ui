import {
  BrowserRouter as Router,
  Switch, Route
} from 'react-router-dom'
import { useCookies } from 'react-cookie'
import './App.css'
import Home from './views/Home'
import Recipes from './views/Recipes'
import Recipe from './views/Recipe'
import Signup from './views/Signup'
import Login from './views/Login'
import NewRecipe from './views/NewRecipe'
import Profile from './views/Profile'
import Navbar from './components/Navbar'





const App = () => {

  const [ cookies, setCookie, removeCookie ] = useCookies(['token'])


  return (
      <Router>
        <div>
          <Navbar removeCookie={removeCookie} />
        </div>

        <Switch>
          <Route path='/recipes'>
            <Recipes />
          </Route>
          <Route path='/recipe/:id/edit' children={<Recipe />}>
            <Recipe />
          </Route>
          <Route path='/recipe/:id/' children={<Recipe />}>
            <Recipe />
          </Route>
          <Route path='/newRecipe' >
            <NewRecipe />
          </Route>
          <Route path='/signup'>
            <Signup />
          </Route>
          <Route path='/login'>
            <Login setCookie={setCookie}/>
          </Route>
          <Route path='/profile'>
            <Profile />
          </Route>
          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </Router>
  )
}

export default App;
