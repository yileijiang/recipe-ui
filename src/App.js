import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom'
import './App.css'
import Home from './views/Home'
import Recipes from './views/Recipes'
import Recipe from './views/Recipe'
import Signup from './views/Signup'
import Login from './views/Login'
import NewRecipe from './views/NewRecipe'



const App = () => {
  return (
    <Router>
      <div>
        <Link to='/recipes'>All Recipes</Link>
        <Link to='/'>Home</Link>
        <Link to='/signup'>Sign Up</Link>
        <Link to='/login'>Log In</Link>
        <Link to='/newRecipe'>New Recipe</Link>
      </div>

      <Switch>
        <Route path='/recipes'>
          <Recipes />
        </Route>
        <Route path='/recipe/:id' children={<Recipe />}>
          <Recipe />
        </Route>
        <Route path='/newRecipe'>
          <NewRecipe />
        </Route>
        <Route path='/signup'>
          <Signup />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
