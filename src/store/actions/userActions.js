import { userService } from "../../services/userService"

export function loadUsers() {
    return async (dispatch) => {
        try {
            const users = await userService.getUsers()
            dispatch({ type: 'SET_USERS', users })
        } catch (err) {
            console.log('err:', err)
        }

    }
}

export function addUser(user) {
    return async (dispatch) => {
        try {
            if (user._id) {
                await userService.update(user)
                dispatch({type: 'UPDATE_USER', user})
            } else {
                await userService.signup(user)
                dispatch({type: 'ADD_USER', user})
            }
        } catch (error) {
            throw error
        }
    }
}

export function removeUser(userId) {
    return async (dispatch) => {
        try {
            await userService.remove(userId)
            dispatch({ type: 'REMOVE_USER', userId })
        } catch (err) {
            console.log('err:', err)
        }
    }
}

export function addFriend(friend) {
    return async (dispatch) => {
        try {
            const userToUpdate = await userService.getLoggedinUser()
            userToUpdate.friends.push(friend)
            const loggedInUser = await userService.updateFriends(userToUpdate)
            dispatch({type: 'SET_CURRENT_USER', loggedInUser})
        } catch (error) {
            console.log(error)
        }
    }
}

export function removeFriend(id) {
    return async (dispatch) => {
        try {
            let userToUpdate = await userService.getLoggedinUser()
            userToUpdate.friends = userToUpdate.friends.filter(f => f._id !== id)
            const loggedInUser = await userService.updateFriends(userToUpdate)
            dispatch({type: 'SET_CURRENT_USER', loggedInUser})
        } catch (error) {
            console.log(error)
        }
    }
}

// export function setFilterBy(filterBy) {
//     return async (dispatch) => {
//         dispatch({ type: 'SET_FILTER_BY', filterBy })
//     }
// }

export function login(userCred) {
    return async (dispatch) => {
        if (!userCred.fullname){
            try {
                const loggedInUser = await userService.login(userCred)
                dispatch({ type: 'SET_CURRENT_USER', loggedInUser})
            } catch (error) {
                console.log('from user Actions error: ', error);        
                throw error        
            }
        } else {
            try {
                const loggedInUser = await userService.signup(userCred)
                dispatch({ type: 'SET_CURRENT_USER', loggedInUser})
            } catch (error) {
                console.log('from user Actions error: ', error);        
                throw error
            }
        }
        
    }
}

export function logout() {
    return async (dispatch) => {
        try {
            await userService.logout()
            dispatch({type: 'REMOVE_LOGGED_IN_USER'})
        } catch (error) {
            console.log('error: ', error);
            throw error
        }
    }
}