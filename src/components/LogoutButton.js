import '../css/LogoutButton.css'


const LogoutButton = ({text, onClick}) => {
  return (
    <>
      <button id='LogoutButton' style={{fontFamily: 'Roboto' }} onClick={onClick}>{text}</button>
    </>
  )
}

export default LogoutButton