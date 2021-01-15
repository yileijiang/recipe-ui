import { gql, useQuery } from '@apollo/client'
import RecipeCard from '../components/RecipeCard'
import React, { useState } from 'react'

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

const Profile = () => {
  const [recipesUser, setRecipesUser] = useState([])

  const { loading, error, data } = useQuery(query, {
    fetchPolicy: "no-cache",
    onCompleted: (data) => { 
      setRecipesUser(data.recipesUser)
    }
  })

      
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return (
    <>
      <p> WELCOME </p>
      <h1>My Recipes</h1>
      {recipesUser.map(r => 
        <RecipeCard key={r.id} recipe={r} recipes={recipesUser} setRecipes={setRecipesUser} />
      )}
      <h1>My Favorite Recipes</h1>
    
    </>
  )
}

export default Profile