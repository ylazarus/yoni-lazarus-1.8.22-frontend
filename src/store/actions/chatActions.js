import { chatService } from "../../services/chatService"

export function closeChatModal() {
  return async (dispatch) => {
    try {
      dispatch({ type: "CLOSE_CHAT_MODAL" })
    } catch (error) {
      console.log(error)
      const errMsg = error.response.data.err
      dispatch({ type: "OPEN_CHAT_MODAL", errMsg })
    }
  }
}

export function setCurrChatId(chatId) {
  return async (dispatch) => {
    try {
      dispatch({ type: "SET_CURRENT_CHAT_ID", chatId })
    } catch (error) {
      console.log(error)
      const errMsg = error.response.data.err
      dispatch({ type: "OPEN_CHAT_MODAL", errMsg })
    }
  }
}

export function removeCurrChatId() {
  return async (dispatch) => {
    try {
      dispatch({ type: "REMOVE_CURRENT_CHAT_ID" })
    } catch (error) {
      console.log(error)
      const errMsg = error.response.data.err
      dispatch({ type: "OPEN_CHAT_MODAL", errMsg })
    }
  }
}

export function getMsgs(chatId) {
  return async (dispatch) => {
    try {
      let msgs = await chatService.getById(chatId)
      if (!msgs) msgs = []
      dispatch({ type: "SET_MSGS", msgs })
    } catch (error) {
      console.log(error)
      const errMsg = error.response.data.err
      dispatch({ type: "OPEN_CHAT_MODAL", errMsg })
    }
  }
}

export function addMsg(msg) {
  return async (dispatch) => {
    try {
      const newMsg = await chatService.addMsg(msg)
      dispatch({ type: "ADD_MSG", newMsg })
    } catch (error) {
      console.log(error)
      const errMsg = error.response.data.err
      dispatch({ type: "OPEN_CHAT_MODAL", errMsg })
    }
  }
}
