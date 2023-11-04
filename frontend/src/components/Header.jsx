import headerLogo from '../images/header__logo.svg';
import { NavLink, useNavigate, useLocation } from "react-router-dom";

export default function Header({loggedIn, emailDisplay, handleLogOut}) {
    const navigate = useNavigate();
    const location = useLocation();

    function signOut() {
      localStorage.removeItem("token")
      navigate("/sign-in", { replace: true })
      handleLogOut();
    }

    return (
      <header className="header">
        <img
          src={headerLogo}
          alt="логотип"
          className="header__logo"
        />
        {loggedIn ? (
          <section className="header__menu">
            <p className="header__email">{emailDisplay}</p>
            <a className="header__exit" onClick={signOut} >Выйти</a>
          </section>
        ) : (
          <>
            {location.pathname.endsWith("sign-in") && (
              <section className="header__menu">
                <p className="header__email"></p>
                <NavLink to="/sign-up" className="header__exit">Регистрация</NavLink>
              </section>
            )}
            {location.pathname.endsWith("sign-up") &&(
              <section className="header__menu">
                <p className="header__email"></p>
                <NavLink to="/sign-in" className="header__exit">Вход</NavLink>
              </section>
            )}
          </>
          
        )}
        
        
      </header>
    );
}