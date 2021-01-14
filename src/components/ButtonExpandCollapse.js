import '../css/ButtonExpandCollapse.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp } from '@fortawesome/free-solid-svg-icons'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'



const ButtonExpandCollapse = ({onClick, display}) => {

  if (display) {
    return (
      <>
      <button id='ButtonExpand' onClick={onClick} >
        <FontAwesomeIcon icon={ faCaretDown }/>
      </button>
    </>
    )
  } else {
    return (
      <>
        <button id='ButtonExpand' onClick={onClick} >
          <FontAwesomeIcon icon={ faCaretUp }/>
        </button>
      </>
    )
  }
}

export default ButtonExpandCollapse