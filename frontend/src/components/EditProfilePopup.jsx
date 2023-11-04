import { useEffect, useState, useContext } from "react";
import PopupWithForm from "./PopupWithForm.jsx";
import currentContext from '../contexts/CurrentUserContext.js';

export default function EditProfilePopup(props) {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const currentUser = useContext(currentContext);

    useEffect(()=>{
      setName(currentUser?.name);
      setDescription(currentUser?.about);
    },[currentUser, props.isOpen])

    function handleSetName(e) {
      setName(e.target.value);
    }

    function handleSetDescription(e) {
      setDescription(e.target.value)
    }

    async function handleSubmit(e) {
      e.preventDefault();
      try {
        await props.onUpdateUser({title: name, description: description});
      }
      catch(err) {
        console.log(err);
      }
    }

    return (
      <PopupWithForm
        popupName="popup-edit"
        formName="edit-form"
        isOpen={props.isOpen}
        title="Редактировать профиль"
        onClose={props.onClose}
        buttonText ={'Сохранить'}
        onSubmit = {handleSubmit}
      >
        <div className="popup__set">
          <label className="popup__field">
            <input
              type="text"
              className="popup__text"
              id="title"
              name="title"
              required
              minLength="2"
              maxLength="40"
              placeholder="Имя"
              value={name || "" }
              onChange={handleSetName}
            />
            <span className="popup__error title-error"></span>
          </label>
          <label className="popup__field">
            <input
              type="text"
              className="popup__text"
              id="description"
              name="description"
              required
              minLength="2"
              maxLength="200"
              placeholder="О себе"
              value={description || "" }
              onChange={handleSetDescription}
            />
            <span className="popup__error description-error"></span>
          </label>
        </div>
      </PopupWithForm>
    );
}