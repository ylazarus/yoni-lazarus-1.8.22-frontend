import { httpService } from "./http.service"
import {userService} from "./userService"
import { socketService } from "./socket.service"

export const chatService = {
  getById,
  addMsg,
  remove,
  update,
  getEmptyChat
}

async function getById(chatId) {
  const chat = await httpService.get(`chat/${chatId}`)
  return chat
}

async function addMsg(msg) {
  const newMsg = await httpService.post(`chat`, msg)
  socketService.emit("chat updated", newMsg)
  return newMsg
}

function remove(chatId) {
  return httpService.delete(`chat/${chatId}`)
}

async function update(chat) {
  const updatedChat = await httpService.put(`chat/${chat._id}`, chat)
  return updatedChat
}

function getEmptyChat() {
    const currUser = userService.getLoggedinUser()
    return {
        sentById: currUser._id,
        sentToId: '',
        txt: ''
    }
}
