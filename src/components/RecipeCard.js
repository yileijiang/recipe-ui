import LinkButton from './LinkButton'

const RecipeCard = ({ recipe }) => {


  const imgURL='https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'

  const RecipeCardStyle = {
    color: 'red',
    backgroundColor: 'lightgrey',
    height: '25em',
    width: '20rem',
    textAlign: 'center',
  }


  return (
    <div style={RecipeCardStyle}>
      <img src={imgURL} width='100%' height='auto'/>
      <h4>{recipe.title}</h4>
      <p>{recipe.description}</p>
      <LinkButton to='/recipe' id={recipe.id}>See Recipe</LinkButton>
    </div>
  )
}

export default RecipeCard