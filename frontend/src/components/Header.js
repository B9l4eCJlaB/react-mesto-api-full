import { Link, useLocation } from "react-router-dom";
import logo from "../images/logo.png";
function Header({ loggedIn, onSignOut, userData }) {
  const { pathname } = useLocation();

  const text = `${pathname === "/sign-in" ? "Регистрация" : "Войти"}`;
  const url = `${pathname === "/sign-in" ? "/sign-up" : "/sign-in"}`;
  return (
    <header className="header">
      <img className="header__logo logo" src={logo} alt="Логотип" />
      {loggedIn ? (
        <div className="header__wrapper">
          <p className="header__login">{userData}</p>
          <button className="header__button" onClick={onSignOut}>
            Выйти
          </button>
        </div>
      ) : (
        <Link className="header__link header__button" to={url}>
          {text}
        </Link>
      )}
    </header>
  );
}

export default Header;
