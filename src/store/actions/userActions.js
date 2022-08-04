import { userService } from "../../services/userService"

export function closeUserModal() {
  return async (dispatch) => {
    try {
      dispatch({ type: "CLOSE_USER_MODAL" })
    } catch (error) {
      console.log(error)
    }
  }
}

export function loadUsers() {
  return async (dispatch) => {
    try {
      const users = await userService.getUsers()
      dispatch({ type: "SET_USERS", users })
    } catch (error) {
      const errMsg = error.response.data.err
      dispatch({ type: "OPEN_USER_MODAL", errMsg })
      console.log("error:", error)
    }
  }
}

export function addUser(user) {
  return async (dispatch) => {
    try {
      if (user._id) {
        await userService.update(user)
        dispatch({ type: "UPDATE_USER", user })
      } else {
        await userService.signup(user)
        dispatch({ type: "ADD_USER", user })
      }
    } catch (error) {
      const errMsg = error.response.data.err
      dispatch({ type: "OPEN_USER_MODAL", errMsg })
      throw error
    }
  }
}

export function removeUser(userId) {
  return async (dispatch) => {
    try {
      await userService.remove(userId)
      dispatch({ type: "REMOVE_USER", userId })
    } catch (error) {
      console.log("error:", error)
      const errMsg = error.response.data.err
      dispatch({ type: "OPEN_USER_MODAL", errMsg })
    }
  }
}

export function addFriend(friend) {
  return async (dispatch) => {
    try {
      const userToUpdate = await userService.getLoggedinUser()
      userToUpdate.friends.push(friend)
      const loggedInUser = await userService.updateFriends(userToUpdate)
      dispatch({ type: "SET_CURRENT_USER", loggedInUser })
    } catch (error) {
      console.log(error)
      const errMsg = error.response.data.err
      dispatch({ type: "OPEN_USER_MODAL", errMsg })
    }
  }
}

export function removeFriend(id) {
  return async (dispatch) => {
    try {
      let userToUpdate = await userService.getLoggedinUser()
      userToUpdate.friends = userToUpdate.friends.filter((f) => f._id !== id)
      const loggedInUser = await userService.updateFriends(userToUpdate)
      dispatch({ type: "SET_CURRENT_USER", loggedInUser })
    } catch (error) {
      console.log(error)
      const errMsg = error.response.data.err
      dispatch({ type: "OPEN_USER_MODAL", errMsg })
    }
  }
}

export function login(userCred) {
  return async (dispatch) => {
    if (!userCred.fullname) {
      try {
        const loggedInUser = await userService.login(userCred)
        dispatch({ type: "SET_CURRENT_USER", loggedInUser })
      } catch (error) {
        const errMsg = error.response.data.err
        dispatch({ type: "OPEN_USER_MODAL", errMsg })
        throw error
      }
    } else {
      try {
        const loggedInUser = await userService.signup(userCred)
        dispatch({ type: "SET_CURRENT_USER", loggedInUser })
      } catch (error) {
        const errMsg = error.response.data.err
        dispatch({ type: "OPEN_USER_MODAL", errMsg })
        throw error
      }
    }
  }
}

export function logout() {
  return async (dispatch) => {
    try {
      await userService.logout()
      dispatch({ type: "REMOVE_LOGGED_IN_USER" })
    } catch (error) {
      console.log("error: ", error)
      const errMsg = error.response.data.err
      dispatch({ type: "OPEN_USER_MODAL", errMsg })
      throw error
    }
  }
}
