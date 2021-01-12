import React from 'react'
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
 
  const { loading, error, data } = useQuery(query, {
    // Apollo saved the data in the cache. 
    // if a hard refresh of the page is done, it will lead to error
    // only for dev
    fetchPolicy: "no-cache"
  })
  

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return(
    <div>
      <h2>Recipes</h2>
      {data.recipes.map(r => 
        <RecipeCard key={r.id} recipe={r} />
        )}
    </div>
  )
}

export default Recipes
