import React from 'react';
import Card from './Card';
import buttonIcon from '../images/add-button.png'

import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useContext } from 'react';
function Main({cards, onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete}) {
    const currentUser = useContext(CurrentUserContext);

    return (
    <main className="main">
    <section className="profile">
        <div className="profile__item">
            <div className="profile__item-wrapper">
                <button className="profile__avatar-button" onClick={onEditAvatar} ></button>
                <img className="profile__avatar" src={currentUser.avatar} alt="Аватар" />
                <div className="profile__info">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <p className="profile__description">{currentUser.about}</p>
                </div>
                <button className="profile__edit-button" onClick={onEditProfile}></button>
            </div>
        </div>
        <button className="profile__add-button" onClick={onAddPlace}><img src={buttonIcon} alt="значок плюса" /></button>
    </section>
    <section className="elements">
        {cards.map(card => (
            <Card 
            key={card._id} 
            card={card} 
            onCardClick={onCardClick} 
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
             />
        ))}
    </section>
    </main>
    )
}
export default Main;