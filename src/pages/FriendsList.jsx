import React from "react"
import { FriendsPreview } from "../cmps/FriendsPreview"
import { useSelector } from "react-redux/es/exports"
import friendsLogo from "../assets/imgs/friends.jpg"

export const FriendsList = (props) => {
  const { loggedInUser } = useSelector((state) => state.userModule)
  const friends = loggedInUser.friends.sort()

  const onFindFriends = () => {
    props.history.push("/users")
  }

  return (
    <section className="friends-page">
      <h1 className="text-center">Click on a friend to chat!</h1>
      <div className="friends-container">
        <ul className="flex column friends-list clean-list">
          {friends.map((friend) => (
            <FriendsPreview key={friend._id} friend={friend} />
          ))}
          <li onClick={onFindFriends}>Find More Friends!</li>
        </ul>
        <img className="friends-photo" src={friendsLogo} />
      </div>
      {/* <button onClick={onFindFriends}>Find More Friends</button> */}
    </section>
  )
}
