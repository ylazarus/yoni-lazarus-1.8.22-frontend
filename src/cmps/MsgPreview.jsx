export const MsgPreview = ({ msg, id }) => {
  const d = new Date(msg.sentAt)
  const formattedDate = d.toLocaleTimeString()
  
  const sentMsgStyle = {
    backgroundColor: '#d9fdd3',
    marginLeft: 'auto'
  }  

  const receivedMsgStyle = {
    backgroundColor: '#fff'
  }

    if (!msg) return <div>Loading...</div>
    return (
      <li className="text-msg" style={msg.sentById === id ? receivedMsgStyle : sentMsgStyle}>
        <div className="sent-by">{msg?.sentByName || ''}</div>
        <div>{msg?.txt || ''}</div>
        <div className="timestamp">{formattedDate || ''}</div>
      </li>
    )
  }
  