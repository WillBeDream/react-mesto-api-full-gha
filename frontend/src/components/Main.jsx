import { useContext } from "react";
import Card from "./Card.jsx";
import currentContext from "../contexts/CurrentUserContext.js";

export default function Main({
  handleEditAvatarClick,
  handleEditProfileClick,
  handleAddPlaceClick,
  onCardClick,
  onCardLike,
  onDeleteCard,
  cards
}) {
  
  const currentUser = useContext(currentContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__wrapper">
          <div
            onClick={handleEditAvatarClick}
            className="profile__avatar-edit"
          ></div>
          <img src={currentUser?.avatar} alt="аватар" className="profile__avatar" />
        </div>

        <div className="profile__info">
          <div className="profile__title-but">
            <h1 className="profile__title">{currentUser?.name}</h1>
            <button
              type="button"
              onClick={handleEditProfileClick}
              className="profile__edit-button"
            ></button>
          </div>
          <p className="profile__description">{currentUser?.about}</p>
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={handleAddPlaceClick}
        ></button>
      </section>

      <section className="elements">
        {cards.map((item)=>{
          return (
          <Card 
            cards={cards} 
            card={item}  
            onCardClick ={onCardClick} 
            onCardLike ={onCardLike} 
            onDeleteCard={onDeleteCard} 
            key= {item._id}  >
          </Card>
        )})}
        
      </section>
      
    </main>
  );
}
