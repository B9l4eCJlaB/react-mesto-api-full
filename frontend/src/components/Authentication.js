import { Link } from "react-router-dom";

function Authentication({
  onSubmit,
  title,
  onEmailHandler,
  onPasswordHandler,
  buttonText,
  text,
  linkText,
  linkRoute,
}) {
  return (
    <form className="authentication" onSubmit={onSubmit}>
      <h3 className="authentication__title">{title}</h3>
      <fieldset className="authentication__fieldset">
        <input
          className="authentication__input"
          type="email"
          placeholder="Email"
          required
          onChange={onEmailHandler}
        />
        <input
          className="authentication__input"
          type="password"
          placeholder="Пароль"
          required
          onChange={onPasswordHandler}
        />
      </fieldset>
      <button className="authentication__button">{buttonText}</button>
      <div className="authentication__bottom">
        <p className="authentication__text">{text}</p>
        <Link className="authentication__link" to={linkRoute}>
          {linkText}
        </Link>
      </div>
    </form>
  );
}
export default Authentication;
