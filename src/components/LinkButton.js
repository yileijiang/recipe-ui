import React from 'react'
import { Link } from 'react-router-dom'


const LinkButton = ({link, text}) => {

  const LinkButtonStyle = {
    padding: '0.5rem 7rem',
    borderRadius: '3px',
    backgroundColor: '#FF9505',
    color: 'white',
    fontWeight: 'bold',
    textDecoration: 'none',
    bottom: '2rem'
  }

  return (
    <div>
      <Link style={LinkButtonStyle} to={link}> {text}</Link>
    </div>
  )

}

export default LinkButton