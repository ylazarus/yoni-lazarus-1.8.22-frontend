import React from "react"
import { NavLink } from "react-router-dom"

export function AppHeader() {
  return (
    <header className="app-header">
      <nav className="header-nav">
          <h3 className="logo">EY-Chat</h3>
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
