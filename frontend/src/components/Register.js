import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register({ handleRegister }) {
  const [values, setValues] = useState({ email: "", password: "" });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleRegister(values.email, values.password);
  };

  return (
    <div className="login">
      <h2 className="login__header">Регистрация</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          value={values.email}
          type="email"
          className="login__input"
          id="email"
          name="email"
          placeholder="Email"
          minLength="2"
          maxLength="30"
          required
        />
        <span id="email-error" className="login__error"></span>
        <input
          onChange={handleChange}
          value={values.password}
          type="password"
          className="login__input"
          id="password"
          name="password"
          placeholder="Пароль"
          minLength="2"
          maxLength="30"
          required
        />
        <span id="password-error" className="login__error"></span>
        <button type="submit" className="login__button-save">
          Зарегистрироваться
        </button>
        <p className="login__paragraph">
          Уже зарегистрированы?{" "}
          <Link to="/signin" className="login__link">
            Войти
          </Link>
        </p>
      </form>
    </div>
  );
}
