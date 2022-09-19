function ImagePopup({card, onClose}) {
    return (
        <section className={`popup popup-image popup_image ${card ? 'popup_opened' : ''}`}>
            <div className="popup-image__container">
                <button
                className="popup__close"
                onClick={onClose}
                ></button>
                <img
                className="popup-image__photo" 
                src={card?.link}
                alt={card?.name}
                />
                <h3 className="popup-image__title">{card?.name}</h3>
            </div>
        </section>
    )
}
export default ImagePopup;