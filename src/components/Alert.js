const Alert = ({message}) => {
  const AlertStyle = {
    color: '#A23C2A',
    fontWeight: '300',
    fontFamily: 'Roboto',
    textAlign: 'center',
    margin: '5rem 2rem'
  }

  if (!message) {
    return (
      <> </>
    )
  } else {
    return (
      <div style={AlertStyle}>
        {message}
      </div>
    )
  }
}

export default Alert