import { useHistory } from "react-router-dom"

export const FriendsPreview = ({ friend }) => {
  const history = useHistory()

  const onOpenChat = () => {
    history.push(`/chat/${friend._id}`)
  }

  if (!friend) return <div>Loading...</div>
  return (
    <li>
      <div onClick={onOpenChat}>{friend.fullname}</div>
    </li>
  )
}
