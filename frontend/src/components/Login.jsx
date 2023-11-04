import { useState } from "react";
import { authorize } from "../utils/Auth.js";
import { useNavigate } from "react-router-dom";

export default function Login({handleAuthorize}) {

    const navigate = useNavigate();

    const [formValue, setFormValue] = useState({
        email : '',
        password : ''
    })

    function handleChange(e) {
        const {name, value} = e.target;
        setFormValue({
            ...formValue,
            [name]: value
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        handleAuthorize(formValue.email, formValue.password);
    }

    return (
        <section className="login">
            <form className="login__form" onSubmit={handleSubmit} >
                <fieldset className="login__inputs">
                    <legend className="login__title">Вход</legend>
                    <input 
                        className="login__input" 
                        name="email" 
                        type="email"
                        placeholder="Email"
                        value={formValue.email}
                        onChange={handleChange}>
                    </input>
                    <span className="login__input-error"></span>
                    <input 
                        className="login__input"
                        name="password"
                        type="password"
                        placeholder="Пароль"
                        value={formValue.password}
                        onChange={handleChange}>
                    </input>
                    <span className="login__input-error"></span>
                </fieldset>
                <div>
                    <button className="login__pass">Войти</button>
                    <p className="login__text">
                        <a className="login__link"></a>
                    </p>
                </div>
            </form>
        </section>
    )
}