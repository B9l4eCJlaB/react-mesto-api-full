import { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const titleRef = useRef();
  const linkRef = useRef();

  useEffect(() => {
    titleRef.current.value = "";
    linkRef.current.value = "";
  }, [isOpen]);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    onAddPlace({ name: titleRef.current.value, link: linkRef.current.value });
  };


  return (
    <PopupWithForm
      name="add-item"
      title="Новое место"
      buttonText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      // onClear={handleClear}
    >
      <input
        ref={titleRef}
        type="text"
        className="form-group__item form-group__item_el_image-title"
        id="image-title"
        name="title"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
      />
      <span id="image-title-error" className="error"></span>

      <input
        ref={linkRef}
        type="url"
        className="form-group__item form-group__item_el_image-link"
        id="image-link"
        name="link"
        placeholder="Ссылка на картинку"
        required
      />
      <span id="image-link-error" className="error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
