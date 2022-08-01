import React from "react"
import { Link } from "react-router-dom"

export function Home() {
  return (
    <section>
      <h1>Welcome to EY Chat!</h1>
      <Link to={"/login"}>Login</Link>
    </section>
  )
}
