import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const cardDeleteButtonClassName = `item__delete ${!isOwn && "item__delete_hidden"}`;
  const isLiked = card.likes.some((i) => i === currentUser._id);
  const cardLikeButtonClassName = `item__like ${isLiked && "item__like_active"}`;
  const handleClickImage = () => onCardClick(card);
  const handleClickLike = () => onCardLike({card, isLiked });
  const handleDeleteClick = () => onCardDelete(card)
  return (
    <article className="item">
      <img className="item__picture" src={card.link} alt={card.name} onClick={handleClickImage} />
      <h2 className="item__title">{card.name}</h2>
      <button type="button" aria-label="Оценить" className={cardLikeButtonClassName} onClick={handleClickLike}>
        <p className="item__like-count">{card.likes.length}</p>
      </button>
      <button type="button" aria-label="Удалить" className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
    </article>
  );
}

export default Card;
