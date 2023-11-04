export default function PopupWithForm(props) {
  
  return (
    <div
      className={`popup ${props.popupName} ${
        props.isOpen ? "popup_opened" : ""
      }`}>
      <form className="popup__container" name={props.formName} onSubmit={props.onSubmit}>
        <button
          type="button"
          className="popup__close"
          onClick={props.onClose}
        ></button>
        <h2 className="popup__title">{props.title}</h2>
        {props.children}
        <button type="submit" className="popup__save-button">
          {props.buttonText}
        </button>
      </form>
    </div>
  );
}
