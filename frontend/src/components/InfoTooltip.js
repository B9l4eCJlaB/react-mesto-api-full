function InfoTooltip({ isOpen, image, name, text, onClose }) {
  return (
    <section className={`popup popup-${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__main-container">
        <div className="popup__form">
          <button className="popup__close" onClick={onClose}></button>
          <img className="popup__tooltip-image" src={image} alt={text} />
          <p className="popup__tooltip-text">{text}</p>
        </div>
      </div>
    </section>
  );
}
export default InfoTooltip;
