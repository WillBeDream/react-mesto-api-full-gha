import success from '../images/Union.svg';
import error from '../images/Union (1).svg';

export function InfoTooltipTrue({isOpen, closePopup}) {

    return (
        
        <div className={`popup ${isOpen ? "popup_opened": ""} `}>
            <form className="popup__container">
                <img src={success} className="popup__icon"/>
                <h2 className="popup__message">Вы успешно зарегистрировались!</h2>
                <button className="popup__close" onClick={closePopup} ></button>
            </form>
        </div>
    )
}

export function InfoTooltipFalse({isOpen, closePopup}) {
    return (
        <div className={`popup ${isOpen ? "popup_opened": ""} `}>
            <form className="popup__container">
                <img src={error} className="popup__icon"/>
                <h2 className="popup__message">Что-то пошло не так! Попробуйте ещё раз.</h2>
                <button className="popup__close" onClick={closePopup} ></button>
            </form>
        </div>
    )
}