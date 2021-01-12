import { gql, useQuery } from '@apollo/client'
import { useParams } from 'react-router'
import RecipeDetails from '../components/RecipeDetails'




const Recipe = () => {
  let { id } = useParams()

  const query = gql`
  query {
    recipe(id: "${id}") {
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

  const { loading, error, data } = useQuery(query, {
    fetchPolicy: "no-cache"
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  const recipe = data.recipe
  
  return(
    <div>
      <RecipeDetails recipe={recipe}/>
    </div>
  )
}

export default Recipe