import { useState } from "react"

export function UserPreview( {user}) {
    


    return(
        <li>
            <div>{user.fullname}</div>
            <button>Add Friend</button>
            <button>Edit User</button>
        </li>
    )
}