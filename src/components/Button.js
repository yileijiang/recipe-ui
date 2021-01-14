

const Button = ({text, onClick}) => {
  const ButtonStyle = {
    backgroundColor: 'lightgrey',
    borderRadius: '5px',
    border: 'none',
    color: 'white',
    padding: '1em',
    outline: 'none'
  }


  return(
    <button onClick={onClick} style={ButtonStyle}>{text}</button>
  )
}

export default Button