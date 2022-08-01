import { userService } from "../../services/userService"

export function loadUsers() {
    return async (dispatch, getState) => {
        try {
            const { filterBy } = getState().userModule
            const users = await userService.query(filterBy)
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

export function setFilterBy(filterBy) {
    return async (dispatch) => {
        dispatch({ type: 'SET_FILTER_BY', filterBy })
    }
}