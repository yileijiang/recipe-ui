import '../css/Button.css'

const Button = ({text, onClick}) => {

  return(
    <button id='Button' onClick={onClick}>{text}</button>
  )
}

export default Button