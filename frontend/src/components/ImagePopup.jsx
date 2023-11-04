export default function ImagePopup ({card, onClose, isOpen}) {
    return (
        <div className={`popup popup_show-image ${isOpen && 'popup_opened'}`}>
            <div className="popup__image-container">
                <img src={card.link} alt={card.name} className="popup__image"/>
                <p className="popup__description">{card.name}</p>
                <button type="button" className="popup__close" onClick={onClose}></button>
            </div>
        </div>
    )
}