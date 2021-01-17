import { gql, useQuery } from '@apollo/client'
import React, { useState } from 'react'
import RecipeCard from '../components/RecipeCard'
import Button from '../components/Button'

const query = gql`
  query {
    recipesUser {
      title
      description
      instruction
      id
    }
    recipesFavorites {
      title
      description
      instruction
      id
    }
  }
`

const Profile = () => {
  const [recipesUser, setRecipesUser] = useState([])
  const [recipesFavorite, setRecipesFavorite] = useSate([])

  const { loading, error, data } = useQuery(query, {
    fetchPolicy: "no-cache",
    onCompleted: (data) => { 
      console.log(data)
      setRecipesUser(data.recipesUser)

    }
  })

      
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return (
    <>
      <h1> Lei </h1>

      <Button text='My Recipes'/>
      <h1>My Recipes</h1>
      {recipesUser.map(r => 
        <RecipeCard key={r.id} recipe={r} recipes={recipesUser} setRecipes={setRecipesUser} />
      )}
      <h1>My Favorite Recipes</h1>
    
    </>
  )
}

export default Profile