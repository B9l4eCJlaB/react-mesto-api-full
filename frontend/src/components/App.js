import React, { useState, useEffect } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ProtectedRoute from "./ProtectedRoute";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import ImagePopup from "./ImagePopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";

import Register from "./Register";
import Login from "./Login";
import SuccessTooltip from "./SuccessTooltip";
import ErrorTooltip from "./ErrorTooltip";

import api from "../utils/api";
import * as auth from "../utils/auth";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [deleteCard, setDeleteCard] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [isSuccessTooltipOpen, setIsSuccessTooltipOpen] = useState(false);
  const [isErrorTooltipOpen, setIsErrorTooltipOpen] = useState(false);

  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    setToken(token);
    if (loggedIn) {
      api
        .getAllData(token)
        .then(([cards, user]) => {
          setCards(cards);
          setCurrentUser(user);
        })
        .catch((err) => {
          setIsErrorTooltipOpen(true);
          console.log(err);
        });
    }
  }, [loggedIn]);
  
  useEffect(() => {
    tokenCheck();
  }, []);

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setDeleteCardPopupOpen(false);
    setSelectedCard(null);
    setDeleteCard({});
    setIsErrorTooltipOpen(false);
    setIsSuccessTooltipOpen(false);
  };
  const handleCardClick = (card) => {
    setSelectedCard(card);
  };
  const handleDeleteCardClick = (card) => {
    setDeleteCardPopupOpen(true);
    setDeleteCard(card);
  };
  const handleCardLike = (card, isLiked) => {
    api
      .changeLikeCardStatus(card._id, isLiked, token)
      .then((newCard) => {
        setCards((cards) => cards.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((err) => console.log(err));
  };
  const handleCardDelete = (card) => {
    setIsLoading(true);
    api
      .delete(card._id, token)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id && c));
      })
      .catch((err) => {
        setIsErrorTooltipOpen(true);
        console.log(err);
      })
      .finally(() => setIsLoading(false));
    closeAllPopups();
  };
  const handleUpdateUser = (data) => {
    setIsLoading(true);
    api
      .setUserInfoApi(data, token)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        setIsErrorTooltipOpen(true);
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  };

  const handleUpdateAvatar = (data) => {
    setIsLoading(true);
    api
      .handleAvatar(data, token)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        setIsErrorTooltipOpen(true);
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  };
  const onAddPlace = (data) => {
    setIsLoading(true);
    api
      .addUserCard(data, token)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        setIsErrorTooltipOpen(true);
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  };
  const handleRegister = (email, password) => {
    auth
      .register(email, password)
      .then((res) => {
        if (res && !res.message) {
          history.push("/sign-in");
          setIsSuccessTooltipOpen(true);
        }
        else {
          setIsErrorTooltipOpen(true);
        }
      })
      .catch((err) => {
        setIsErrorTooltipOpen(true);
        console.log(err);
      });
  };
  const handleLogin = (email, password) => {
    auth
      .authorize(email, password)
      .then((data) => {
        if (data) {
          localStorage.setItem("jwt", data.token);
          setToken(data.token);
          setEmail(email);
          setLoggedIn(true);
          history.push("/");
        } else {
          setIsErrorTooltipOpen(true);
        }
      })
      .catch((err) => {
        setIsErrorTooltipOpen(true);
        console.log(err);
      });
  };
  const tokenCheck = () => {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth
        .checkToken(token)
        .then((data) => {
          if (data) {
            setLoggedIn(true);
            setEmail(data.email);
            history.push("/");
          }
        })
        .catch((err) => console.log(err));
    }
  };
  const handleSignOut = () => {
    setLoggedIn(false);
    localStorage.removeItem("jwt");
    setToken("");
    setEmail("");
    history.push("/sign-in");
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__content">
          <Header
            loggedIn={loggedIn}
            onSignOut={handleSignOut}
            userData={email}
          />
          <Switch>
            <ProtectedRoute
              exact
              path="/"
              component={Main}
              cards={cards}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleDeleteCardClick}
              loggedIn={loggedIn}
            />
            <Route path="/sign-up">
              <Register onSubmit={handleRegister} />
            </Route>
            <Route path="/sign-in">
              <Login onSubmit={handleLogin} />
            </Route>
            <Route>
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            </Route>
          </Switch>
          <Footer />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoading}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={onAddPlace}
            isLoading={isLoading}
          />

          <DeleteCardPopup
            card={deleteCard}
            isOpen={isDeleteCardPopupOpen}
            onClose={closeAllPopups}
            onDeleteCard={handleCardDelete}
            isLoading={isLoading}
          />

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />

          <SuccessTooltip
            isOpen={isSuccessTooltipOpen}
            onClose={closeAllPopups}
          />
          <ErrorTooltip isOpen={isErrorTooltipOpen} onClose={closeAllPopups} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
