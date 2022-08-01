import { userService } from "../../services/userService"

export function loadUsers() {
    return async (dispatch, getState) => {
        try {
            const { filterBy } = getState().userModule
            const users = await userService.getUsers(filterBy)
            dispatch({ type: 'SET_USERS', users })
        } catch (err) {
            console.log('err:', err)
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

// export function setFilterBy(filterBy) {
//     return async (dispatch) => {
//         dispatch({ type: 'SET_FILTER_BY', filterBy })
//     }
// }

export function login(userCred) {
    return async (dispatch) => {
        if (!userCred.fullname){
            try {
                const loggedinUser = await userService.login(userCred)
                dispatch({ type: 'SET_LOGGED_IN_USER', loggedinUser})
            } catch (error) {
                console.log('from user Actions error: ', error);        
                throw error        
            }
        } else {
            try {
                const loggedinUser = await userService.signup(userCred)
                dispatch({ type: 'SET_LOGGED_IN_USER', loggedinUser})
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