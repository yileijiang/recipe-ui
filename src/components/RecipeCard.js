import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import LinkButton from './LinkButton'
import ButtonExpandCollapse from './ButtonExpandCollapse'
import Button from './Button'


const Details = ({recipe, setRecipes, recipes}) => {

  // console.log(recipes)

  const query = gql`
  mutation recipeDelete($id: ID!) {
    recipeDelete(id: $id) {
      title
      description
      instruction
    }
  }  
`
  
  const [deleteRecipe, { data }] = useMutation(query, {
    fetchPolicy: "no-cache",
    variables: { "id": `${recipe.id}`},
    onCompleted: (data) => { 
      console.log('success')
    }
  })


  const handleDeleteRecipe = () => {
    deleteRecipe()
    const newRecipes = recipes.filter(r => r.id !== recipe.id)
    setRecipes(newRecipes)
  }
  
  const DetailsButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  }

  return (
    <>
      <div style={DetailsButtonStyle} >
        {/* <LinkButton link='/recipe/' id={recipe.id} text='See Recipe'></LinkButton> */}
        <Button text='Delete' onClick={ handleDeleteRecipe } />
        <Button text='Edit' />
      </div>
    </>
  )
}



const RecipeCard = ({ recipe, recipes, setRecipes }) => {

  console.log(recipes)

  const imgURL='https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
  const [ displayDetails, setDisplayDetails ] = useState(false)

  const RecipeCardStyle = {
    margin: '2rem',
    backgroundColor: 'ECECEC',
    borderRadius: '3px',
    boxShadow: '1px 0px 10px 1px rgba(0,0,0,0.3)',
    height: '15rem',
    width: '20rem',
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
            {displayDetails && <Details recipe={recipe} recipes={recipes} setRecipes={setRecipes} />}
          </div>
        </div>
      </div>
  )
}

export default RecipeCard