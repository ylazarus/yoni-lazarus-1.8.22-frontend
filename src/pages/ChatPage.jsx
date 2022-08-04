import React from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux/es/exports"
import { MsgPreview } from "../cmps/MsgPreview"
import { getMsgs, addMsg } from "../store/actions/chatActions"
import { useForm } from "../hooks/useForm"
import { chatService } from "../services/chatService"
import { socketService } from "../services/socket.service"
import { useRef } from "react"

export const ChatPage = (props) => {
  const [newMsg, handleChange, setNewMsg] = useForm(null)

  const messagesEnd = useRef(null)

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
      loadMsgs()
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
      await dispatch(getMsgs(id))
      scrollToBottom()
    } catch (error) {
      console.log("error", error)
    }
  }

  const onSendMsg = async (ev) => {
    ev.preventDefault()
    try {
      await dispatch(addMsg({...newMsg}))
      resetNewMsg()
      scrollToBottom()
    } catch (error) {
      console.log("error", error)
    }
  }

  const scrollToBottom = () => {
    messagesEnd.current.scrollIntoView({ behavior: "smooth" });
  }


  if (!msgs || !newMsg) return <div>loading...</div>
  return (
    <section className="chat-page flex column">
      <ul className="all-msgs clean-list">
        {msgs.map((msg) => (
          <MsgPreview key={msg._id} msg={msg} id={id} />
        ))}
        <li style={{ float:"left", clear: "both" }} // dummy li for scroll to bottom on load and new messages
             ref={messagesEnd}>
        </li>
      </ul>
      <form className="add-msg-form flex" onSubmit={onSendMsg}>
          <input
            className="new-msg-input"
            placeholder="Type a message"
            onChange={handleChange}
            value={newMsg.txt}
            type="text"
            name="txt"
            id="txt"
          />
        <button className="d-btn">Send</button>
        </form>
    </section>
  )
}
