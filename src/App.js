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
import { ErrorModal } from "./cmps/ErrorModal"
import { useDispatch, useSelector } from "react-redux/es/exports"
import { closeChatModal } from "./store/actions/chatActions"
import { closeUserModal } from "./store/actions/userActions"


function App() {
  const dispatch = useDispatch()

  const { userErrMsg, confirmationMsg } = useSelector((state) => state.userModule)
  const { chatErrMsg } = useSelector((state) => state.chatModule)

  const onCloseModal = () => {
    dispatch(closeChatModal())
    dispatch(closeUserModal())
  }
  
  return (
    <Router>
      <div className="App">
        <AppHeader />
        {(userErrMsg || chatErrMsg || confirmationMsg) && <ErrorModal onCloseModal={onCloseModal} confirmationMsg={confirmationMsg} userErrMsg={userErrMsg} chatErrMsg={chatErrMsg} />}
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
