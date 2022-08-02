import React, {useEffect, useState} from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { useDispatch, useSelector} from "react-redux"
import { userService } from "../services/userService"
import { addFriend, removeFriend } from "../store/actions/userActions"

export const UserPreview = (props) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const { loggedInUser } = useSelector((state) => state.userModule)
    const [isAlreadyFriend, setIsAlreadyFriend] = useState(null)

    const friendToAdd = {fullname: props.user.fullname, _id: props.user._id}
    
    useEffect(() => {
        const isAlreadyFriend = loggedInUser?.friends.some(f => f._id === props.user._id)
        setIsAlreadyFriend(isAlreadyFriend)
    }, [loggedInUser])

    
  const onAddFriend = async () => {
    try {
      await dispatch(addFriend(friendToAdd))
      alert("added successfully")
    } catch (error) {
      alert("failed to add friend")
    }
  }

  const onUnFriend = async () => {
    try {
        await dispatch(removeFriend(props.user._id))
        alert("removed successfully")
      } catch (error) {
        alert("failed to delete friend")
      }
  }

  const onEditUser = () => {
    history.push(`/add-user/${props.user._id}`)
  }

  if (!loggedInUser) return <div>Loading...</div>
  if (isAlreadyFriend) return (
    <li>
      <div>{props.user.fullname}</div>
      <button onClick={onUnFriend}>Unfriend</button>
      {loggedInUser.isAdmin && <button onClick={onEditUser}>Edit User</button>}
    </li>
  )
  return (
    <li>
      <div>{props.user.fullname}</div>
      <button onClick={onAddFriend}>Add Friend</button>
      {loggedInUser.isAdmin && <button onClick={onEditUser}>Edit User</button>}
    </li>
  )
}
