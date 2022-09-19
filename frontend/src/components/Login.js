import Authentication from "./Authentication";
import { useState } from "react";

function Login({onSubmit}) {
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
        title="Вход"
        buttonText="Войти"
        text="Ещё не зарегистрированы?"
        linkText="Регистрация"
        linkRoute="/sign-up"
        onSubmit={handleSubmit}
        onEmailHandler={emailHandler}
        onPasswordHandler={passwordHandler}
        />
    )
}
export default Login;