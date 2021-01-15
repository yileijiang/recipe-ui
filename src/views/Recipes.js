import React, { useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import RecipeCard from '../components/RecipeCard'

const query = gql`
  query {
    recipes {
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

const Recipes = () => {
  const [recipes, setRecipes] = useState([])

  const { loading, error, data } = useQuery(query, {
    fetchPolicy: "no-cache",
    onCompleted: (data) => { 
      setRecipes(data.recipes)
    }
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>


  return (
    <div>
      <h2>Recipes</h2>
       {recipes.map(recipe => 
        <RecipeCard key={recipe.id} recipe={recipe} recipes={recipes} setRecipes={setRecipes} />
        )}
    </div>
  )
  
}

export default Recipes
