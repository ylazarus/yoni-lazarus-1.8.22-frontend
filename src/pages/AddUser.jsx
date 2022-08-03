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
    const userToSave = id
      ? await userService.getById(id)
      : userService.getEmptyUser()
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
      alert("user deleted successfully")
    } catch (error) {
      alert("failed to remove user")
    }
  }

  const onBack = () => {
    props.history.push("/users")
  }

  if (!userToSave) return <div className="card-display">Loading...</div>
  if (!currUser) return <div className="card-display">Please log in</div>
  if (!currUser.isAdmin) return <div className="card-display">Only admins can access this page</div>
  return (
    <section className="card-display">
      <h1>{id ? "Edit user" : "Add new user"}</h1>
      <form className="form-inputs flex column" onSubmit={onSaveUser}>
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
        <div className="flex auto-center m10">
          <button className="l-btn">Save!</button>
        </div>
      </form>
      <div className="add-user-buttons-container flex column">
        <button className="l-btn m5" onClick={onRemove}>Delete User</button>
        <button className='l-btn m5' onClick={onBack}>Back</button>
      </div>
    </section>
  )
}
