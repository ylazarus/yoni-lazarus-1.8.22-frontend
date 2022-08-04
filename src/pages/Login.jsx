import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useForm } from "../hooks/useForm"
import { login, logout, loadUsers } from "../store/actions/userActions"
import { userService } from "../services/userService"

export const Login = (props) => {
  const [userInfo, handleChange, setUserInfo] = useForm(null)
  const [isSignup, setIsSignup] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(null)
  const [currUser, setCurrUser] = useState(null)
  const [loginFailed, setLoginFailed] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    const currUser = userService.getLoggedinUser()
    setCurrUser(currUser)
  }, [isLoggedIn])

  useEffect(() => {
    setUserInfo({ username: "", password: "", fullname: "" })
  }, [])

  const onLogin = async (ev) => {
    ev.preventDefault()
    try {
      await dispatch(login({ ...userInfo }))
      await dispatch(loadUsers())
      setIsLoggedIn(true)
    } catch (error) {
      console.log(error, "could not log in right now")
      setLoginFailed(true)
    }
  }

  const onLogout = async () => {
    await dispatch(logout())
    setUserInfo({ username: "", password: "", fullname: "" })
    setCurrUser(null)
    setIsLoggedIn(false)
  }

  const onTryAgain = () => {
    setLoginFailed(false)
  }

  const onDoSignup = () => {
    setIsSignup(true)
  }

  const onDoSignin = () => {
    setIsSignup(false)
  }

  const onToChats = () => {
    props.history.push("/friends")
  }

  if (!userInfo) return <div className="card-display">Loading...</div>
  if (loginFailed)
    return (
      <section className="card-display">
        <h3>Login failed, please try again</h3>
        <button onClick={onTryAgain} className="l-btn">
          Back To Login
        </button>
      </section>
    )
  if (currUser || isLoggedIn)
    return (
      <section className="card-display">
        <h3 className="text-center">Welcome!</h3>
        <h3 className="text-center">
          You are logged in as {currUser?.fullname || ""}
        </h3>
        <div className="login-options flex column">
          <button className="l-btn" onClick={onLogout}>
            Logout
          </button>
          <button className="l-btn" onClick={onToChats}>To Chats</button>
        </div>
      </section>
    )
  return (
    <section className="card-display">
      <h1>{isSignup ? "Sign Up!" : "Sign In"}</h1>
      <form
        className="login-form form-inputs flex column space-between align-center"
        onSubmit={onLogin}
      >
        <section>
          <label htmlFor="username" className="bold">
            Username{" "}
          </label>
          <input
            onChange={handleChange}
            value={userInfo.username}
            type="text"
            name="username"
            id="username"
          />
        </section>
        <section>
          <label htmlFor="password" className="bold">
            Password{" "}
          </label>
          <input
            onChange={handleChange}
            value={userInfo.password}
            type="password"
            name="password"
            id="password"
          />
        </section>
        {isSignup && (
          <section>
            <label htmlFor="fullname" className="bold">
              Full Name{" "}
            </label>
            <input
              onChange={handleChange}
              value={userInfo.fullname}
              type="text"
              name="fullname"
              id="fullname"
            />
          </section>
        )}
        <button className="l-btn m20">
          {isSignup ? "Sign Up!" : "Login"}
        </button>
      </form>
      {isSignup && (
        <button className="l-btn" onClick={onDoSignin}>
          Back to Login
        </button>
      )}
      {!isSignup && (
        <section className="flex column align-center">
          <p>No account yet?</p>
          <button className="l-btn" onClick={onDoSignup}>
            Sign me up!
          </button>
        </section>
      )}
    </section>
  )
}
