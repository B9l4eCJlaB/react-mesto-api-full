import { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Footer from "./Footer";

function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div
          className="profile__avatar"
          onClick={props.onEditAvatar}
          style={{ backgroundImage: `url(${currentUser.avatar})` }}
        />

        <div className="info">
          <h1 className="info__name">{currentUser.name}</h1>
          <button
            type="button"
            aria-label="Редактировать"
            className="info__button-reduct"
            onClick={props.onEditProfile}
          ></button>
          <p className="info__about">{currentUser.about}</p>
        </div>
        <button type="button" aria-label="Добавить" className="profile__add-button" onClick={props.onAddPlace}></button>
      </section>

      <section className="cards">
        {props.cards.map((item) => (
          <Card
            card={item}
            key={item._id}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
        ))}
      </section>
      <Footer />
    </main>
  );
}

export default Main;
