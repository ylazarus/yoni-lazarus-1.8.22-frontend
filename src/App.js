import { Redirect } from "react-router-dom/cjs/react-router-dom.min"
import { HashRouter as Router, Route, Switch } from "react-router-dom"
import "./assets/scss/global.scss"
import { AppHeader } from "./cmps/AppHeader"
import { Home } from './pages/Home'
import { About } from "./pages/About"
import { Login } from "./pages/Login"
import { UserPage } from "./pages/UserPage"


function App() {
  return (
    <Router>
      <div className="App">
        <AppHeader />
        <main>
          <Switch>
            <Route path="/about" component={About}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/users" component={UserPage}></Route>
            <Route path="/" component={Home} ></Route>
          </Switch>
        </main>
      </div>
    </Router>
  )
}

export default App
