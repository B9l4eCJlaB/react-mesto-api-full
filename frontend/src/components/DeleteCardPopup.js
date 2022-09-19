import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";
function DeleteCardPopup({ isOpen, onClose, onDeleteCard, card, isLoading }) {
  const currentUser = useContext(CurrentUserContext);
  const handleDeleteCard = (e) => {
    e.preventDefault();
    if (card.owner === currentUser._id) {
      onDeleteCard(card);
    }
  };
  return (
    <PopupWithForm
      title="Вы уверены?"
      name="delete"
      buttonText="Да"
      buttonLoadingText="Удаление..."
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleDeleteCard}
      isLoading={isLoading}
    />
  );
}
export default DeleteCardPopup;
