import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser({
      name: name,
      about: description,
    });
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile"
      buttonText="Сохранить"
      buttonLoadingText="Сохранение..."
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <input
        className="popup__input popup__input_name"
        name="name"
        id="input-name"
        type="text"
        required
        value={name || ""}
        minLength={2}
        maxLength={40}
        placeholder="Введите имя"
        onChange={handleChangeName}
      />
      <span className="popup__error input-name-error"></span>
      <input
        className="popup__input popup__input_description"
        name="about"
        id="input-description"
        type="text"
        required
        value={description || ""}
        minLength={2}
        maxLength={200}
        placeholder="О себе"
        onChange={handleChangeDescription}
      />
      <span className="popup__error input-description-error"></span>
    </PopupWithForm>
  );
}
export default EditProfilePopup;
