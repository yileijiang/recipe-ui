import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { gql, useMutation } from '@apollo/client'


const query = gql`
  mutation favoriteRecipeAdd($id: ID!) {
    favoriteRecipeAdd(id: $id) {
      title
    }
  }
`

const ButtonFavorite = ({recipeId}) => {

  const [sendQuery, { data }] = useMutation(query, {
    fetchPolicy: "no-cache",
    variables: { "id": `${recipeId}`},
    onCompleted: (data) => { 
      console.log('successfully added to favorites')
    }
  })

  const onClick = () => {
    sendQuery()
  }

  return (
    <>
      <button onClick={onClick} >
        <FontAwesomeIcon icon={ faHeart }/>
      </button>
    </>
  )
}

export default ButtonFavorite