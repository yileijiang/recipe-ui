import { gql, useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { useParams, useLocation } from 'react-router'
import RecipeDetails from '../components/RecipeDetails'
import RecipeForm from '../components/RecipeForm'



const query = gql`
query getRecipe($id: ID!) {
  recipe(id: $id) {
    id
    title
    description
    instruction
    ingredients {
      id
      name
      quantity
    }
    tags {
      name
      id
    }
  }
}
`


const Recipe = () => {
  const [recipe, setRecipe] = useState('')

  let { id } = useParams()
  let location = useLocation()
  const url = location.pathname.toString()

  const renderForm = (location.pathname.includes('edit')) ? true : false

  const { loading, error, data } = useQuery(query, {
    fetchPolicy: "no-cache",
    variables: {"id": id},
    onCompleted: (data) => {
      setRecipe(data.recipe)
    }
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
  
  console.log(recipe)
 
  return (
    <div>
      {(renderForm) ? 
      <RecipeForm recipe={recipe? recipe: data.recipe} setRecipe={setRecipe}/> 
      : <RecipeDetails recipe={recipe? recipe : data.recipe} />
      } 

    </div>
  )


  
}

export default Recipe