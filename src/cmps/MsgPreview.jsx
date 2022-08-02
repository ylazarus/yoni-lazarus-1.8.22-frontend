export const MsgPreview = ({ msg }) => {
  const d = new Date(msg.sentAt)
  const formattedDate = d.toLocaleString()
    
    if (!msg) return <div>Loading...</div>
    return (
      <li>
        <div>{msg?.sentByName || ''}</div>
        <div>{msg?.txt || ''}</div>
        <div>{formattedDate || ''}</div>
      </li>
    )
  }
  