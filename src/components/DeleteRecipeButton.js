import { gql, useMutation } from '@apollo/client'
import Button from './Button'

const DeleteRecipeButton = ({recipe, setRecipes, recipes}) => {

  const query = gql`
  mutation recipeDelete($id: ID!) {
    recipeDelete(id: $id) {
      title
      description
      instruction
    }
  }  
`
  const [sendQuery, { data }] = useMutation(query, {
    fetchPolicy: "no-cache",
    variables: { "id": `${recipe.id}`},
    onCompleted: (data) => { 
      console.log('success')
    }
  })

  const handleDeleteRecipe = () => {
    sendQuery()
    const newRecipes = recipes.filter(r => r.id !== recipe.id)
    setRecipes(newRecipes)
  }
  
  return (
    <>
        <Button text='Delete' onClick={ handleDeleteRecipe } />
    </>
  )
}

export default DeleteRecipeButton