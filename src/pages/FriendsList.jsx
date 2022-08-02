import React from 'react'
import { FriendsPreview } from '../cmps/FriendsPreview'
import { useSelector } from 'react-redux/es/exports'

export const FriendsList = (props) => {

    const { loggedInUser } = useSelector((state) => state.userModule)
    const friends = loggedInUser.friends

    const onFindFriends = () => {
        props.history.push('/users')
    }
  
  return (
    <section>
        <h1>Click on a friend to chat!</h1>
        <ul>
        {friends.map(friend =>
            <FriendsPreview key={friend._id} friend={friend} />
            )}
        </ul>
        <button onClick={onFindFriends}>Find More Friends</button>
    </section>
  )
}