

const Button = ({text, onClick}) => {
  const ButtonStyle = {
    backgroundColor: 'red',
    border: '1px solid black',
    color: 'white',
    padding: '1em'
  }


  return(
    <button onClick={onClick} style={ButtonStyle}>{text}</button>
  )
}

export default Button