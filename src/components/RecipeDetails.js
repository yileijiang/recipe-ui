

const RecipeDetails = ({recipe}) => {
  const imgURL='https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'

  const ingredientsList = recipe.ingredients.map( ingredient => {
    return <li> {ingredient.name} {ingredient.quantity} </li>
  })
  

  return(
    <div>
      <h1>{recipe.title}</h1>
      <hr/>
      <img src={imgURL} width='500px' height='300pyx'/>
      <p>{recipe.description}</p>
      <hr/>
      <h3>Ingredients</h3>
      <ul> {ingredientsList} </ul>
      <hr/>
      <h3>Instructions</h3>
      <p>{recipe.instruction} </p>
    </div>

  )
}

export default RecipeDetails