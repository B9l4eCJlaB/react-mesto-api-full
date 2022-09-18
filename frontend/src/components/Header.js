import { Link, Route, Switch } from "react-router-dom";
import logo from "../images/header-logo.svg";

function Header({ email, logOut }) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип Место-Россия" />

      <Switch>
        <Route path="/signin">
          <Link className="header__link" to="signup">
            Рeгистрация
          </Link>
        </Route>
        <Route path="/signup">
          <Link className="header__link" to="signin">
            Войти
          </Link>
        </Route>
        <Route exact path="/">
          <p className="header__email">
            {email}
            <Link className="header__link" onClick={logOut} to="signin">
              Выйти
            </Link>
          </p>
          <div className="header__burger-menu" />
        </Route>
      </Switch>
    </header>
  );
}

export default Header;
