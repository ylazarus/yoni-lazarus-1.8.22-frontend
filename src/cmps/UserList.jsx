import { UserPreview } from "./UserPreview"

export function UserList({users}) {
    if(!users) return <div>Loading...</div>
  return (
    <ul>
        {users.map(user =>
            <UserPreview key={user._id} user={user} />
            )}
    </ul>
  )
}
