import { storageService } from './storageService.js'
import { makeId } from './utilService.js'

export const userService = {
    query,
    save,
    remove,
    getById,
    getEmptyUser,
}

const STORAGE_KEY = 'users'



var gUsers = _loadUsers()

function query(filterBy) {
    let usersToReturn = gUsers;
    if (filterBy) {
        var { type, maxBatteryStatus, minBatteryStatus, model } = filterBy
       
    }
    return Promise.resolve([...usersToReturn]);
}

function getById(id) {
    const user = gUsers.find(user => user._id === id)
    return Promise.resolve({ ...user })
}

function remove(id) {
    const idx = gUsers.findIndex(user => user._id === id)
    gUsers.splice(idx, 1)
    if (!gUsers.length) gUsers = gDefaultUsers.slice()
    storageService.store(STORAGE_KEY, gUsers)
    return Promise.resolve()
}

function save(userToSave) {
    if (userToSave._id) {
        const idx = gUsers.findIndex(user => user._id === userToSave._id)
        gUsers.splice(idx, 1, userToSave)
    } else {
        userToSave._id = makeId()
        gUsers.push(userToSave)
    }
    storageService.store(STORAGE_KEY, gUsers)
    return Promise.resolve(userToSave);
}

// function _update(userToSave) {
//     const idx = gUsers.findIndex(user => user._id === userToSave._id)
//     gUsers.splice(idx, 1, userToSave)
//     return Promise.resolve(userToSave)
// }


// function _add(userToSave) {

// }

function getEmptyUser() {
    return {
        fullname: '',
        username: '',
        password: ''
    }
}

function _loadUsers() {
    let users = storageService.load(STORAGE_KEY)
    if (!users || !users.length) users = gDefaultUsers
    storageService.store(STORAGE_KEY, users)
    return users
}

