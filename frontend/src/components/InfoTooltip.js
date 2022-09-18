export default function InfoTooltip({ isOpen, onClose, status, message }) {
  return (
    <div className={`popup ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <div className={`popup__picture popup__picture_${status ? "ok" : "error"}`}></div>
        <p className="popup__message">{message}</p>
        <button className="popup__button-close" onClick={onClose} />
      </div>
    </div>
  );
}
