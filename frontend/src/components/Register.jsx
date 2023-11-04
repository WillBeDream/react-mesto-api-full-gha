import { useState } from "react";

export default function Register ({handleRegister}) {

    const [formValue, setFormValue] = useState({
        email: '',
        password: '',
        
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
        handleRegister(formValue.email, formValue.password);
    }

    return (
        <section className="login">
            <form className="login__form" onSubmit={handleSubmit}>
                <fieldset className="login__inputs">
                    <legend className="login__title">Регистрация</legend>
                    <input 
                        className="login__input" 
                        name="email" 
                        type="email"
                        placeholder="Email"
                        onChange={handleChange}
                        value={formValue.email}>
                    </input>
                    <span className="login__input-error"></span>
                    <input 
                        className="login__input"
                        name="password"
                        type="password"
                        placeholder="Пароль"
                        onChange={handleChange}
                        value={formValue.password}>
                    </input>
                    <span className="login__input-error"></span>
                </fieldset>
                <div>
                    <button 
                        type="submit" 
                        className="login__pass">
                            Зарегестрироваться
                    </button>
                    <p className="login__text">
                        Уже зарегестрированы?
                        <a className="login__link">Войти</a>
                    </p>
                </div>
            </form>
        </section>
    )
}