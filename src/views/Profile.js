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

const GridStyle = {
  display: 'grid',
  gridTemplateRows: '1fr 1fr 1fr', 
  gridTemplateColumns: '1fr 1fr 1fr'
}


const Profile = () => {
  const [recipesUser, setRecipesUser] = useState([])
  const [recipesFavorites, setRecipesFavorites] = useState([])

  const { loading, error, data } = useQuery(query, {
    fetchPolicy: "no-cache",
    onCompleted: (data) => { 
      setRecipesUser(data.recipesUser)
      setRecipesFavorites(data.recipesFavorites)

    }
  })

      
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  const recipesUserDisplay =  recipesUser.map(r => <div><RecipeCard key={r.id} recipe={r} recipes={recipesUser} setRecipes={setRecipesUser} /></div>)

  const recipesFavoritesDisplay = recipesFavorites.map(r => <RecipeCard key={r.id} recipe={r} recipes={recipesUser} setRecipes={setRecipesUser} />)

  return (
    <>
      <h1> Lei </h1>

      <Button text='My Recipes'/>

      <h1>My Recipes</h1>
      <div style={GridStyle}>
        {recipesUserDisplay}
      </div>
     
      <h1>My Favorite Recipes</h1>
      {recipesFavoritesDisplay}
    
    </>
  )
}

export default Profile