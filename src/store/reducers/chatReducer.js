
const INITIAL_STATE = {
    msgs: [],
    currChatId: null,
    chatErrMsg: null
}

export function chatReducer(state = INITIAL_STATE, action) {

    switch (action.type) {
        case 'OPEN_CHAT_MODAL':
            return {
                ...state,
                chatErrMsg: action.errMsg
            }

        case 'CLOSE_CHAT_MODAL':
            return {
                ...state,
                chatErrMsg: null
            }

        case 'SET_MSGS':
            return {
                ...state,
                msgs: action.msgs
            }

        case 'ADD_MSG':
            return {
                ...state,
                msgs: [...state.msgs, action.newMsg]
            }

        case 'REMOVE_MSG':
            return {
                ...state,
                msgs: state.msgs.filter(msg => msg._id !== action.msgId)
            }

        case 'SET_CURRENT_CHAT_ID':
            return {
                ...state,
                currChatId: action.currChatId
            }
    
        case 'REMOVE_CURRENT_CHAT_ID':
            return {
                ...state,
                currChatId: null
            }
    
        default:
            return state;
    }
}