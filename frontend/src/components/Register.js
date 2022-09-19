import { useState } from "react";
import Authentication from "./Authentication";

function Register({onSubmit}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const emailHandler = (e) => {
        setEmail(e.target.value);
    }
    const passwordHandler = (e) => {
        setPassword(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(email, password)
    }
    return (
        <Authentication
        title="Регистрация"
        buttonText="Зарегистрироваться"
        text="Уже зарегистрированы?"
        linkText="Войти"
        linkRoute="/sign-in"
        onSubmit={handleSubmit}
        onEmailHandler={emailHandler}
        onPasswordHandler={passwordHandler}
        />
    )
}
export default Register;