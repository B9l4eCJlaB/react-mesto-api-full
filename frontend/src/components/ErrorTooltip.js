import InfoTooltip from "./InfoTooltip";
import Error from "../images/error.svg";

function ErrorTooltip({isOpen, onClose}) {
    return (
        <InfoTooltip
        isOpen={isOpen}
        onClose={onClose}
        name="error"
        image={Error}
        text="Что-то пошло не так! Попробуйте ещё раз."
        />
    )
}
export default ErrorTooltip;