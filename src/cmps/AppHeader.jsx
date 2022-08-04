import React from "react"
import { NavLink, useHistory } from "react-router-dom"

export function AppHeader() {
  const history = useHistory()

  const onLogoClicked = () => {
    history.push('/')
  }
  return (
    <header className="app-header">
      <nav className="header-nav">
          <h3 onClick={onLogoClicked} className="logo">EY-Chat</h3>
        <NavLink exact to="/">
          Home
        </NavLink>
        <NavLink to="/friends">
          Messages
        </NavLink>
        <NavLink to="/users">
          Manage Friends
        </NavLink>
        <NavLink to="/login">
          Login
        </NavLink>
        <NavLink className='about-link' to="/about">
          About
        </NavLink>
      </nav>
    </header>
  )
}
