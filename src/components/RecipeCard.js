import React, { useState } from 'react'
import ButtonExpandCollapse from './ButtonExpandCollapse'
import DeleteRecipeButton from './DeleteRecipeButton'
import LinkButton from './LinkButton'


const RecipeCard = ({ recipe, recipes, setRecipes }) => {

  const imgURL='https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
  const [ displayDetails, setDisplayDetails ] = useState(false)

  const RecipeCardStyle = {
    margin: '2rem',
    backgroundColor: 'ECECEC',
    borderRadius: '3px',
    boxShadow: '1px 0px 10px 1px rgba(0,0,0,0.3)',
    height: '20rem',
    width: '25rem',
    overflow: 'auto'
  }

    const PictureStyle = {
    backgroundImage: 'url(https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80)',
    backgroundSize: 'cover',
    width: '100%',
    height: '80%',
    borderRadius: '3px 3px 0 0'
  }

  const PictureStyleDetails = {
    backgroundImage: 'linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url(https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80)',
    backgroundSize: 'cover',
    width: '100%',
    height: '50%',
    borderRadius: '3px 3px 0 0'
  }

  const RecipeCardButtonStyle = {
    bottom: '2rem',
    left: '0.405rem'
  }

  const InfoStyle = {
    height: '20%',
    padding: '0 1rem',
  }

  const TitleStyle = {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: '#303036'
  }

  const DetailsStyle = {
    height: '0%'
  }

  const toggleDetails = () => {
    displayDetails ? setDisplayDetails(false) : setDisplayDetails(true)
  } 

  let pictureToggle = displayDetails ? PictureStyleDetails : PictureStyle

  return (
      <div style={RecipeCardStyle}>
        <div style={pictureToggle}></div>
        <div style={InfoStyle}>
          <div style={TitleStyle}> 
            <h3>{recipe.title}</h3>
            <ButtonExpandCollapse onClick={toggleDetails} display={displayDetails}/> 
          </div>
          <div style={DetailsStyle}>
            {displayDetails && <DeleteRecipeButton recipe={recipe} recipes={recipes} setRecipes={setRecipes} />}
            {displayDetails && <LinkButton  text='Edit' link= {`/recipe/${recipe.id}/edit`} />}
            {displayDetails && <LinkButton  text='View' link= {`/recipe/${recipe.id}`} />}
          </div>
        </div>
      </div>
  )
}

export default RecipeCard