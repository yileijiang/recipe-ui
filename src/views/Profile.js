import { gql, useQuery } from '@apollo/client'
import RecipeCard from '../components/RecipeCard'

import UserWrapper from '../UserWrapper'

const Profile = () => {

  const query = gql`
    query {
      recipesUser {
        title
        description
        instruction
        id
        ingredients {
          name
          quantity
        }
      }
    }
    `

  const { loading, error, data } = useQuery(query, {
    fetchPolicy: "no-cache"
  })
    
  
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>


  //Display USERNAME, EDIT PROFILE BUTTON, PICTURE USER, 
  // DISPLAY MENU: MY RECIPES; FAVORITE RECIPES

  return(
    <>
      <p> WELCOME </p>

      <h1>My Recipes</h1>
      {data.recipesUser.map(r => 
        <RecipeCard key={r.id} recipe={r} />
      )}

      <h1>My Favorite Recipes</h1>
    
      
     
      

    
    </>
  )
}

export default Profile