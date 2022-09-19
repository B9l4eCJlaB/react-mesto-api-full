import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const cardDeleteButtonClassName = `element__trash ${
    isOwn ? "element__trash_active" : ""
  }`;
  const isLiked = card.likes.some((i) => i === currentUser._id);
  const cardLikeButtonClassName = `element__like ${
    isLiked ? "element__like_active" : ""
  }`;
  const handleCardClick = () => {
    onCardClick(card);
  };
  const handleCardLike = () => {
    onCardLike(card, isLiked);
  };
  const handleCardDelete = () => {
    onCardDelete(card);
  };
  return (
    <article className="elements__item element">
      {isOwn && (
        <button
          type="button"
          className={cardDeleteButtonClassName}
          onClick={handleCardDelete}
        ></button>
      )}
      <img
        className="element__image"
        src={`${card.link}`}
        alt={`${card.name}`}
        onClick={handleCardClick}
      />
      <div className="element__info">
        <h2 className="element__name">{`${card.name}`}</h2>
        <div className="element__wrapper">
          <button
            className={cardLikeButtonClassName}
            onClick={handleCardLike}
          ></button>
          <span className="element__count">{`${card.likes.length}`}</span>
        </div>
      </div>
    </article>
  );
}
export default Card;
