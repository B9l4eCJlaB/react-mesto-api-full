import { useState } from "react";
import PopupWithForm from "./PopupWithForm";
function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {

  const [formValues, setFormValues] = useState({ name: "", link: "" });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormValues((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleAddPlaceSubmit = (e) => {
    e.preventDefault();
    onAddPlace(formValues);
    setFormValues({ name: "", link: "" });
  };

  return (
    <PopupWithForm
      title="Новое место"
      name="add"
      buttonText="Сохранить"
      buttonLoadingText="Сохранение..."
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleAddPlaceSubmit}
      isLoading={isLoading}
    >
      <input
        className="popup__input popup__input_place"
        name="name"
        id="input-place"
        type="text"
        required
        value={formValues.name || ""}
        minLength={2}
        maxLength={30}
        placeholder="Название"
        onChange={handleChange}
      />
      <span className="popup__error input-place-error"></span>
      <input
        className="popup__input popup__input_href"
        name="link"
        id="input-href"
        type="url"
        required
        value={formValues.link || ""}
        placeholder="Ссылка на картинку"
        onChange={handleChange}
      />
      <span className="popup__error input-href-error"></span>
    </PopupWithForm>
  );
}
export default AddPlacePopup;
