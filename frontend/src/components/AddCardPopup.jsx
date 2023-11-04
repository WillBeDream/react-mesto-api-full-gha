import { useState } from "react";
import PopupWithForm from "./PopupWithForm.jsx";

export default function AddCardPopup(props) {

    const [name, setName] = useState("");
    const [link, setLink] = useState("");

    function handleSetName(e) {
      setName(e.target.value);
    }

    function handleSetLink(e) {
      setLink(e.target.value);
    }

    async function handleSubmit(e) {
      e.preventDefault();
      try {
        await props.onAddPlace({name: name, link: link});
      }
      catch(err) {
        console.log(err);
      }
      setLink('');
      setName('');
    }

    return (
      <PopupWithForm
        popupName="popup-add"
        formName="add-form"
        isOpen={props.isOpen}
        title="Новое место"
        onClose={props.onClose}
        buttonText ={"Создать"}
        onSubmit ={handleSubmit}
      >
        <div className="popup__set">
          <label className="popup__field">
            <input
              type="text"
              className="popup__text"
              id="add-title"
              name="add-title"
              placeholder="Название"
              required
              minLength="2"
              maxLength="30"
              value={name}
              onChange={handleSetName}
            />
            <span className="popup__error add-title-error"></span>
          </label>
          <label className="popup__field">
            <input
              type="url"
              className="popup__text"
              id="add-description"
              name="add-description"
              placeholder="Ссылка на картинку"
              required
              value={link}
              onChange={handleSetLink}
            />
            <span className="popup__error add-description-error"></span>
          </label>
        </div>
      </PopupWithForm>
    );
}