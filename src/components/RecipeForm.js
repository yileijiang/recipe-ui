import React, { useEffect, useState } from 'react'
import { gql, useMutation, useQuery } from '@apollo/client'
import { v4 as uuidv4 } from 'uuid'
import { useHistory } from 'react-router'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import Button from './Button'
import IngredientField from './IngredientField'


const queryAddRecipe = gql`
  mutation recipeCreate($recipe: RecipeInput!) {
    recipeCreate(recipeInput: $recipe) {
      id
      title
      description
      instruction
      ingredients {
        name
        quantity
      }
      tags {
        name
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

const queryTags = gql `
  query {
    tags { name, id }
  }
`

const RecipeForm = ({recipe, setRecipe}) => {

  let editRecipe = recipe ? true : false
  
  let recipeState = {
      title: '',
      description: '',
      instruction: '',
      ingredients: [{name: '', quantity: '', idForm: `${uuidv4()}`}],
      tags: []
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
  const [ tags, setTags ] = useState(recipeState.tags)
  let history = useHistory()
    

  const [createRecipe, { dataAdd }] = useMutation(queryAddRecipe, {
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
      history.push(`/recipe/${data.recipeCreate.id}`)
    }
  })

  const [updateRecipe, { dataUpdate }] = useMutation(queryUpdateRecipe, {
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
      setRecipe(data.recipeUpdate)
      history.push(`/recipe/${data.recipeUpdate.id}`)
    }
  })

  useEffect(() => {

  }, [])

  const { loading, error, data } = useQuery(queryTags, {
    fetchPolicy: "no-cache",
    onCompleted: (data) => { 
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
    let copyTags = tags.map(t => t)
    copyTags.forEach(t => delete t.__typename)

    if (editRecipe) {
      updateRecipe({variables: {"recipe": {"id": `${recipe.id}`, "title": `${newTitle}`, "description": `${newDescription}`, "instruction": `${newInstruction}`, "ingredients": copyIngredients}}})
    } else {
      createRecipe({variables: {"recipe": {"title": `${newTitle}`, "description": `${newDescription}`, "instruction": `${newInstruction}`, "ingredients": copyIngredients, "tags": tags }}})
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


  if (loading) {
    return (
      <> </>
    )
  }


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

        select up to 5 tags
        <Autocomplete multiple
          onChange={(event, value) => setTags(value)}
          options={data.tags}
          getOptionLabel={(option) => option.id}
          style={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />} />


        {(editRecipe)? 
          <Button text='Edit Recipe'/>
        : <Button text='Add New Recipe'/>
        }

      </form>
    </div>
  )
}

export default RecipeForm