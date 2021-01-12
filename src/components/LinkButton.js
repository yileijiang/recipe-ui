import React from 'react'
import { Link } from 'react-router-dom'


const LinkButton = ({id}) => {
  const link = `/recipe/${id}`
  return (
    <Link to={link}>recipe</Link>
  )

}

export default LinkButton