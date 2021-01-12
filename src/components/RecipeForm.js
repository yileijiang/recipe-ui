import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import Button from './Button'
import IngredientField from './IngredientField'
import stringifyObject from 'stringify-object'
import { useHistory } from 'react-router'



const RecipeForm = () => {
  const [ newTitle, setNewTitle ] = useState('')
  const [ newDescription, setNewDescription ] = useState('')
  const [ newInstruction, setNewInstruction ] = useState('')
  const [ ingredients, setIngredients ] = useState([{name: '', quantity: '', id: '1'}])
  const [ counter, setCounter ] = useState(2)
  let history = useHistory()

  const query = gql`
    mutation {
      recipeAdd(
        recipeInput: {
          title: "${newTitle}"
          description: "${newDescription}"
          instruction: "${newInstruction}"
          ingredients: ${stringifyObject(ingredients, { singleQuotes: false })}
        }
      ) {
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

  const [addRecipe, { data }] = useMutation(query, {
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
      console.log(data)
      history.push(`/recipe/${data.recipeAdd.id}`)
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
    copyIngredients.forEach(i => delete i.id)
    await setIngredients(copyIngredients)
    addRecipe()
  }

  const addNewField = (event) => {
    event.preventDefault()
    const newIngredients = ingredients.concat({name: '', quantity: '', id: `${counter}`})
    setIngredients(newIngredients)
    const newCounter = counter + 1
    setCounter(newCounter)
  }

  const ingredientFields = ingredients.map( (ingredient) => {
    return <IngredientField key={ingredient.id} ingredient={ingredient} ingredients={ingredients} setIngredients={setIngredients}/>
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
        <Button text='Add New Recipe'/>
      </form>
    </div>
  )
}

export default RecipeForm