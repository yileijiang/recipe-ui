import LinkButton from './LinkButton'
import Button from './Button'

const RecipeCard = ({ recipe }) => {


  const imgURL='https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'

  const RecipeCardStyle = {
    margin: '2rem',
    backgroundColor: 'ECECEC',
    borderRadius: 2,
    boxShadow: '1px 0px 10px 1px rgba(0,0,0,0.3)',
    height: '25rem',
    width: '20rem',
    textAlign: 'center',
    position: 'relative'
  }

  const RecipeCardPictureStyle = {
    height: '200px',
    backgroundImage: 'linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url(https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80)',
    backgroundSize: 'cover',
    width: '100%',
    height: '50%',
    borderRadius: '2px 2px 0 0'
  }

  const RecipeCardButtonStyle = {
    position: 'absolute',
    bottom: '2rem',
    left: '0.405rem'
  }

  const displayButtons = () => {
    return (
      <>
      <Button text='Delete Recipe'/>
      <Button text='Edit Recipe'/>
      </>
    )
  }


  return (
    <div style={RecipeCardStyle}>
      <div style={RecipeCardPictureStyle}>
      </div>
      <h3>{recipe.title}</h3>
      <p>{recipe.description}</p>
      <div style={RecipeCardButtonStyle} >
        <LinkButton link='/recipe/' id={recipe.id} text='See Recipe'></LinkButton>
        
      </div>
    </div>
  )
}

export default RecipeCard