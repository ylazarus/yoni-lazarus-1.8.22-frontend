import React from "react"
import { Link } from "react-router-dom"

export function Home() {
  return (
    <section className="card-display">
      <h1>Welcome to EY Chat!</h1>
      <h3>Log in, find friends, chat!</h3>
      <Link className="l-btn" to={"/login"}>To Login</Link>
    </section>
  )
}
