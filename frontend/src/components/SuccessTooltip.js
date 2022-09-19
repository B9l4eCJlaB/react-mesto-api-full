import InfoTooltip from "./InfoTooltip";
import Success from "../images/succes.svg";

function SuccessTooltip({isOpen, onClose}) {
    return (
        <InfoTooltip
        isOpen={isOpen}
        onClose={onClose}
        image={Success}
        name="success"
        text="Вы успешно зарегистрировались!"
        />
    )
}
export default SuccessTooltip;