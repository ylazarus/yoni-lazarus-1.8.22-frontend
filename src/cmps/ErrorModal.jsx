
export const ErrorModal = ({confirmationMsg, userErrMsg, chatErrMsg, onCloseModal}) => {
  
  if (confirmationMsg) return (
    <section className="modal-wrapper">
      <div className="modal-content">
        <h1>Success!</h1>
        <h3>{confirmationMsg}</h3>
        <h3>Please keep being awesome</h3>
        <button onClick={onCloseModal} className="dismiss">X</button>
      </div>
    </section>
  )
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
