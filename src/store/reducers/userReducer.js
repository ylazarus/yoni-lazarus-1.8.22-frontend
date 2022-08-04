import { userService } from "../../services/userService"

const INITIAL_STATE = {
  users: [],
  loggedInUser: userService.getLoggedinUser() || null,
  userErrMsg: null
}

export function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'OPEN_USER_MODAL':
        return {
            ...state,
            userErrMsg: action.errMsg
        }

    case "CLOSE_USER_MODAL":
      return {
        ...state,
        userErrMsg: null,
      }

    case "SET_USERS":
      return {
        ...state,
        users: action.users,
      }

    case "ADD_USER":
      return {
        ...state,
        users: [...state.users, action.user],
      }

    case "REMOVE_USER":
      return {
        ...state,
        users: state.users.filter((user) => user._id !== action.userId),
      }

    case "SET_CURRENT_USER":
      return {
        ...state,
        loggedInUser: action.loggedInUser,
      }

    case "REMOVE_LOGGED_IN_USER":
      return {
        ...state,
        loggedInUser: null,
      }

    default:
      return state
  }
}
