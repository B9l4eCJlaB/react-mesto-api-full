import { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  };

  useEffect(() => {
    avatarRef.current.value = '';
  }, [isOpen]);

  return (
    <PopupWithForm
      name="change-avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        ref={avatarRef}
        type="url"
        className="form-group__item form-group__item_el_image-link"
        id="avatar-link"
        name="avatar"
        placeholder="Ссылка на аватар"
        required
      />
      <span id="avatar-link-error" className="error"></span>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;
