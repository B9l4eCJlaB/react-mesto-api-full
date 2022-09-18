import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser?.name || "");
    setDescription(currentUser?.about || "");
  }, [currentUser]);

  const handleChangeName = (evt) => {
    setName(evt.target.value);
  };

  const handleChangeDescription = (evt) => {
    setDescription(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  };

  return (
    <PopupWithForm
      name="reduct"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        value={name}
        onChange={handleChangeName}
        type="text"
        id="firstname"
        className="form-group__item form-group__item_el_name"
        name="name"
        minLength="2"
        maxLength="40"
        required
      />
      <span id="firstname-error" className="error"></span>

      <input
        value={description}
        onChange={handleChangeDescription}
        type="text"
        id="job"
        className="form-group__item form-group__item_el_job"
        name="about"
        minLength="2"
        maxLength="200"
        required
      />
      <span id="job-error" className="error"></span>
    </PopupWithForm>
  );
}
export default EditProfilePopup;
