
function PopupWithForm({title, name, buttonText, children, isOpen, onClose, onSubmit, isLoading, buttonLoadingText}) {
    return (
        <section className={`popup popup-${name} ${isOpen ? 'popup_opened' : ''}`}>
        <div className="popup__main-container">
            <button className="popup__close" onClick={onClose}></button>
            <form className={`popup__form ${name}-form`} name={`form-${name}`} onSubmit={onSubmit} noValidate  action="#">
                <h2 className="popup__heading">{title}</h2>
                <fieldset className="popup__input-container">
                    {children}
                    <button className="popup__submit-button" type="submit">{!isLoading ? buttonText : buttonLoadingText}</button>
                </fieldset>
            </form>
        </div>
        </section>
    )
}
export default PopupWithForm;