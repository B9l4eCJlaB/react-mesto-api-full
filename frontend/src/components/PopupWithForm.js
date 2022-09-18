import React from "react";
function PopupWithForm(props) {
  const handleSubmit = (evt) => {
    props.onSubmit(evt);
  };
  return (
    <div className={`popup popup_button_${props.name} ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <h3 className="popup__heading">{props.title}</h3>
        <form className="form-group" name={props.name} onSubmit={handleSubmit}>
          {props.children}
          <button name="saved-form" type="submit" className="form-group__button-save">
            {props.buttonText || "Сохранить"}
          </button>
        </form>
        <button type="button" aria-label="Закрыть" className="popup__button-close" onClick={props.onClose}></button>
      </div>
    </div>
  );
}

export default PopupWithForm;
