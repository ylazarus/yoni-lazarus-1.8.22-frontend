import React from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux/es/exports"
import { MsgPreview } from "../cmps/MsgPreview"
import { setCurrChatId, getMsgs, addMsg } from "../store/actions/chatActions"
import { useForm } from "../hooks/useForm"
import { chatService } from "../services/chatService"
import { socketService } from "../services/socket.service"

export const ChatPage = (props) => {
  const [newMsg, handleChange, setNewMsg] = useForm(null)

  const dispatch = useDispatch()
  const id = props.match.params.id
  
  const { msgs } = useSelector((state) => state.chatModule)

  useEffect(() => {  
    
    resetNewMsg()
    loadMsgs()
  }, [])

  useEffect(() => {
    const topic = id
    socketService.emit('chat topic', topic)
    socketService.on("message received", () => {
      console.log('message received');
      // onMessageAdded(data)
    })
    return () => {
      socketService.off("message received")
    }
  }, [])
  
  const resetNewMsg = async () => {
    const newMsg = chatService.getEmptyChat()
    newMsg.sentToId = id
    newMsg.txt = ''
    setNewMsg(newMsg)
  }

  const loadMsgs = async () => {
    try {
      await dispatch(setCurrChatId(id))
      await dispatch(getMsgs(id))
    } catch (error) {
      console.log("error", error)
      alert("cant load messages now")
    }
  }

  const onSendMsg = async (ev) => {
    ev.preventDefault()
    try {
      await dispatch(addMsg({...newMsg}))
      // await loadMsgs()
      resetNewMsg()
    } catch (error) {
      console.log("error", error)
      alert("cant send message now")
    }
  }

  const onBack = () => {
    props.history.push('/friends')
  }


  if (!msgs || !newMsg) return <div>loading...</div>
  return (
    <section>
      <ul>
        {msgs.map((msg) => (
          // <MsgPreview key={msg._id} msg={msg} />
          <MsgPreview msg={msg} />
        ))}
      </ul>
      <hr />
      <form onSubmit={onSendMsg}>
        <section>
          <label htmlFor="txt">New Message: </label>
          <input
            onChange={handleChange}
            value={newMsg.txt}
            type="text"
            name="txt"
            id="txt"
          />
        </section>
        <button>Send</button>
        </form>
        <button onClick={onBack}>Back To Contacts</button>
    </section>
  )
}
