import { useHistory } from "react-router-dom"

export const FriendsPreview = ({ friend }) => {
  const history = useHistory()

  const onOpenChat = () => {
    history.push(`/chat/${friend._id}`)
  }

  if (!friend) return <div>Loading...</div>
  return (
    <li onClick={onOpenChat} className="friend-li">
      <p className="chat-preview">
        {friend.fullname}
        {/* {friend?.lastMessage || " (No messages to display now)"} */}
      </p>
    </li>
  )
}
