import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadUsers } from "../store/actions/userActions"
import { UserList } from "../cmps/UserList"
import handshake from "../assets/imgs/handshake.jpg"

export const UserPage = () => {
  const { users } = useSelector((state) => state.userModule)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadUsers())
    console.log(users)
  }, [])

  if (!users) return <div>Loading...</div>
  return (
    <section className="friends-page">
      <h1 className="text-center">All Users</h1>
      <div className="friends-container">
        <UserList users={users} />
        <img className="friends-photo" src={handshake} />
      </div>
    </section>
  )
}
