import { UserPreview } from "./UserPreview"

export const UserList = ({users}) => {
    if(!users) return <div>Loading...</div>
  return (
    <ul className="flex column friends-list clean-list">
        {users.map(user =>
            <UserPreview key={user._id} user={user} />
            )}
    </ul>
  )
}
