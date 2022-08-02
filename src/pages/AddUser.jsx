import React, { useEffect, useState } from "react"
import { useForm } from "../hooks/useForm"
import { useDispatch } from "react-redux/es/exports"
import { userService } from "../services/userService"
import { addUser, removeUser } from "../store/actions/userActions"

export const AddUser = (props) => {
  const [currUser, setCurrUser] = useState(null)

  const [userToSave, handleChange, setUserToSave] = useForm(null)

  const dispatch = useDispatch()

  useEffect(() => {
    const currUser = userService.getLoggedinUser()
    setCurrUser(currUser)
    loadUser()
  }, [])

  const id = props.match.params.id

  const loadUser = async () => {
    const userToSave = id ? await userService.getById(id) : userService.getEmptyUser()
    setUserToSave(userToSave)
  }

  const onSaveUser = async (ev) => {
    ev.preventDefault()
    try {
      await dispatch(addUser({ ...userToSave }))
      alert("user saved successfully")
    } catch (error) {
      console.log(error)
      alert("failed to save user")
    }
    console.log("saving...")
  }

  const onRemove = async () => {
    try {
        await dispatch(removeUser(id))
        alert('user deleted successfully')
    } catch (error) {
        alert('failed to remove user')
    }
  }

  const onBack = () => {
    props.history.push('/users')
  }

  if (!userToSave) return <div>Loading...</div>
  if (!currUser) return <div>Please log in</div>
  if (!currUser.isAdmin) return <div>Only admins can access this page</div>
  return (
    <section>
      {id ? <h1>Edit user</h1> : <h1>Add new user</h1>}
      <form onSubmit={onSaveUser}>
        <section>
          <label htmlFor="username">Username </label>
          <input
            onChange={handleChange}
            value={userToSave.username}
            type="text"
            name="username"
            id="username"
          />
        </section>
        {!id && (
          <section>
            <label htmlFor="password">Password </label>
            <input
              onChange={handleChange}
              value={userToSave.password}
              type="text"
              name="password"
              id="password"
            />
          </section>
        )}
        <section>
          <label htmlFor="fullname">Full Name </label>
          <input
            onChange={handleChange}
            value={userToSave.fullname}
            type="text"
            name="fullname"
            id="fullname"
          />
        </section>
        <section>
          <label htmlFor="isAdmin">Admin? </label>
          <select
            onChange={handleChange}
            value={userToSave.isAdmin}
            type="text"
            name="isAdmin"
            id="isAdmin"
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </section>
        <button>Save!</button>
      </form>
      <button onClick={onRemove}>Delete User</button>
      <button onClick={onBack}>Back</button>
    </section>
  )
}
