const Alert = ({messages}) => {
  const AlertStyle = {
    color: '#A23C2A',
    fontWeight: '300',
    fontFamily: 'Roboto',
    textAlign: 'center',
    margin: '1rem 3rem'
  }


  if (!messages) {
    return (
      <> </>
    )
  } else {
    return (
      <div style={AlertStyle}>
        {messages.map(m => (
          <p>{m}</p>
        ))}
      </div>
    )
  }
}

export default Alert