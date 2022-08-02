import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadUsers } from "../store/actions/userActions"
import { UserList } from "../cmps/UserList"

export const UserPage = () => {
  const { users } = useSelector((state) => state.userModule)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadUsers())
    console.log(users)
  }, [])

  if (!users) return <div>Loading...</div>
  return (
    <section>
      <h1>User Page</h1>
      <UserList users={users} />
    </section>
  )
}
