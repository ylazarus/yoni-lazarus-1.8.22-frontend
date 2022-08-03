import { Redirect } from "react-router-dom/cjs/react-router-dom.min"
import { HashRouter as Router, Route, Switch } from "react-router-dom"
import "./assets/scss/global.scss"
import { AppHeader } from "./cmps/AppHeader"
import { Home } from './pages/Home'
import { About } from "./pages/About"
import { Login } from "./pages/Login"
import { UserPage } from "./pages/UserPage"
import { ChatPage } from "./pages/ChatPage"
import { AddUser } from "./pages/AddUser"
import { FriendsList } from "./pages/FriendsList"


function App() {
  return (
    <Router>
      <div className="App">
        <AppHeader />
        <main className="main-content">
          <Switch>
            <Route path="/about" component={About}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/friends" component={FriendsList}></Route>
            <Route path="/chat/:id?" component={ChatPage}></Route>
            <Route path="/users" component={UserPage}></Route>
            <Route path="/add-user/:id?" component={AddUser}></Route>
            <Route path="/" component={Home} ></Route>
          </Switch>
        </main>
      </div>
    </Router>
  )
}

export default App
