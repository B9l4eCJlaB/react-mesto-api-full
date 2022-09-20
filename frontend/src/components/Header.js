import { Link, useLocation } from "react-router-dom";
import logo from "../images/logo.png";
import burgerBtn from '../images/burger.png';
import closeBtn from '../images/Close-burger.png';
import { useEffect, useState } from "react";
function Header({ loggedIn, onSignOut, userData }) {
  const { pathname } = useLocation();
  const [isInvisible, setIsInvisible] = useState(true);
  const mobileButton = isInvisible ? burgerBtn : closeBtn;

  const text = `${pathname === "/sign-in" ? "Регистрация" : "Войти"}`;
  const url = `${pathname === "/sign-in" ? "/sign-up" : "/sign-in"}`;

  function handleBurgerButton() {
    isInvisible ? setIsInvisible(false) : setIsInvisible(true);
  }

  useEffect(() => {
    if (!loggedIn) setIsInvisible(true);
  }, [loggedIn])

  return (
    <header className="header">
      <div className={`header__container header__container${loggedIn ? '_logged' : ''}`}>
        <div className={`header__logo-container header__logo-container${loggedIn ? '_logged' : ''}`}>
          <img className="header__logo logo" src={logo} alt="Логотип" />
          <button
            className="header__burger-button"
            style={{ backgroundImage: `url(${loggedIn ? mobileButton : ''})` }}
            onMouseDown={handleBurgerButton}
          ></button>
        </div>
        {loggedIn ? (
          <div
            className={`header__wrapper header__wrapper${isInvisible && loggedIn ? '_hidden' : ''}
        header__wrapper${loggedIn ? '_logged' : ''}`}>
            <p className="header__login">{userData}</p>
            <button className="header__button" onClick={onSignOut}>
              Выйти
            </button>
            </div>
        ) : (
          <Link className='header__link' to={url}>
            {text}
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
