
export const ErrorModal = ({userErrMsg, chatErrMsg, onCloseModal}) => {
  
  return (
    <section className="modal-wrapper">
      <div className="modal-content">
        <h1>Oops!</h1>
        <h3>{userErrMsg || chatErrMsg}</h3>
        <h3>Please go back and try again</h3>
        <button onClick={onCloseModal} className="dismiss">X</button>
      </div>
    </section>
  )
}
