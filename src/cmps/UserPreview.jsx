import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { useDispatch, useSelector } from "react-redux"
import { addFriend, removeFriend } from "../store/actions/userActions"

export const UserPreview = (props) => {
  const history = useHistory()

  const dispatch = useDispatch()

  const { loggedInUser } = useSelector((state) => state.userModule)

  const [isAlreadyFriend, setIsAlreadyFriend] = useState(null)

  const friendToAdd = { fullname: props.user.fullname, _id: props.user._id }

  useEffect(() => {
    const isAlreadyFriend = loggedInUser?.friends.some(
      (f) => f._id === props.user._id
    )
    setIsAlreadyFriend(isAlreadyFriend)
  }, [loggedInUser])

  const onAddFriend = async (ev) => {
    ev.stopPropagation() // buttons are on a clickable <li>
    try {
      await dispatch(addFriend(friendToAdd))
    } catch (error) {
      console.log("failed to add friend")
    }
  }

  const onUnFriend = async (ev) => {
    ev.stopPropagation()
    try {
      await dispatch(removeFriend(props.user._id))
    } catch (error) {
      console.log("failed to delete friend")
    }
  }

  const onOpenChat = async () => {
    if (!isAlreadyFriend) await onAddFriend()
    history.push(`/chat/${props.user._id}`)
  }

  const onEditUser = (ev) => {
    ev.stopPropagation()
    history.push(`/add-user/${props.user._id}`)
  }

  if (!loggedInUser) return <div>Loading...</div>
  if (loggedInUser._id === props.user._id) return null
  if (isAlreadyFriend)
    return (
      <li onClick={onOpenChat} className="friend-li flex">
        <div className="full-grow">{props.user.fullname}</div>
        <button className="un-friend-btn l-btn" onClick={onUnFriend}>
          Unfriend
        </button>
        {loggedInUser.isAdmin && (
          <button className="l-btn" onClick={onEditUser}>
            Edit User
          </button>
        )}
      </li>
    )
  return (
    <li onClick={onOpenChat} className="friend-li flex">
      <div className="full-grow">{props.user.fullname}</div>
      <button className="un-friend-btn l-btn" onClick={onAddFriend}>
        Add Friend
      </button>
      {loggedInUser.isAdmin && (
        <button className="l-btn" onClick={onEditUser}>
          Edit User
        </button>
      )}
    </li>
  )
}
