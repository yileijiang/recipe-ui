import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { v4 as uuidv4 } from 'uuid'
import Button from './Button'
import IngredientField from './IngredientField'
import { useHistory } from 'react-router'



const queryAddRecipe = gql`
  mutation recipeAdd($recipe: RecipeInput!) {
    recipeAdd(recipeInput: $recipe) {
      id
      title
      description
      instruction
      ingredients {
        name
        quantity
      }
    }
  }
`

const queryUpdateRecipe = gql `
  mutation recipeUpdate($recipe: RecipeInput!) {
    recipeUpdate(recipeInput: $recipe) {
      id
      title
      description
      instruction
      ingredients {
        name
        quantity
      }
    }
  }
`



const RecipeForm = ({recipe, setRecipe}) => {

  let editRecipe = recipe ? true : false
  
  let recipeState = {
      title: '',
      description: '',
      instruction: '',
      ingredients: [{name: '', quantity: '', idForm: `${uuidv4()}`}]
    }


  if (editRecipe && !(recipe.ingredients[0].idForm)) {
    recipe.ingredients.forEach(i => delete i.__typename)
    recipe.ingredients.forEach(i => i.idForm = uuidv4())
    recipeState = recipe
  }

  const [ newTitle, setNewTitle ] = useState(recipeState.title)
  const [ newDescription, setNewDescription ] = useState(recipeState.description)
  const [ newInstruction, setNewInstruction ] = useState(recipeState.instruction)
  const [ ingredients, setIngredients ] = useState(recipeState.ingredients)
  let history = useHistory()
    

  const [addRecipe, { dataAdd }] = useMutation(queryAddRecipe, {
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
      history.push(`/recipe/${data.recipeAdd.id}`)
    }
  })

  const [updateRecipe, { dataUpdate }] = useMutation(queryUpdateRecipe, {
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
      setRecipe(data.recipeUpdate)
      history.push(`/recipe/${data.recipeUpdate.id}`)
    }
  })
  
  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleDescriptionChange = (event) => {
    setNewDescription(event.target.value)
  }

  const handleInstructionChange = (event) => {
    setNewInstruction(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    let copyIngredients = ingredients.map(i => i)
    copyIngredients.forEach(i => delete i.idForm)

    if (editRecipe) {
      updateRecipe({variables: {"recipe": {"id": `${recipe.id}`, "title": `${newTitle}`, "description": `${newDescription}`, "instruction": `${newInstruction}`, "ingredients": copyIngredients}}})
    } else {
      addRecipe({variables: {"recipe": {"title": `${newTitle}`, "description": `${newDescription}`, "instruction": `${newInstruction}`, "ingredients": copyIngredients}}})
    }
    
  }

  const addNewField = (event) => {
    event.preventDefault()
    const newIngredients = ingredients.concat({name: '', quantity: '', idForm: `${uuidv4()}`})
    setIngredients(newIngredients)
  }

  const ingredientFields = ingredients.map( (ingredient) => {
    return <IngredientField key={ingredient.idForm} ingredient={ingredient} ingredients={ingredients} setIngredients={setIngredients}/>
  })

  return (
    <div>
       <form onSubmit={handleSubmit} >
        title
        <input value={newTitle} onChange={handleTitleChange} /> <br/>
        description
        <input value={newDescription} onChange={handleDescriptionChange} /> <br/>
        instruction
        <input value={newInstruction} onChange={handleInstructionChange} />

        {ingredientFields}

        <Button text='Add More Ingredients' onClick={addNewField} />
        {(editRecipe)? 
          <Button text='Edit Recipe'/>
        : <Button text='Add New Recipe'/>
        }
      </form>
    </div>
  )
}

export default RecipeForm