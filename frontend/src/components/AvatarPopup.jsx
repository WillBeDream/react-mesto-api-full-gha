import { useState, useRef } from "react";
import PopupWithForm from "./PopupWithForm.jsx";

export default function AvatarPopup(props) {

    const [avatar, setAvatar] = useState("");
    const ref = useRef();

    function handleSetLink(e) {
      setAvatar(e.target.value);
    }

    async function handleSubmit(e) {
      e.preventDefault();
      try {
        await props.onUpdateAvatar({avatar: ref.current.value});
      }
      catch(err) {
        console.log(err);
      }
      setAvatar('');
    }
  
    return (
      <PopupWithForm
        popupName="popup-avatar"
        formName="avatar-form"
        isOpen={props.isOpen}
        title="Обновить аватар"
        onClose={props.onClose}
        buttonText ={'Обновить'}
        onSubmit = {handleSubmit}
      >
        <div className="popup__set">
          <label className="popup__field">
            <input
              type="text"
              className="popup__text"
              id="add-avatar"
              name="add-avatar"
              placeholder="ссылка на картинку"
              required
              value={avatar}
              onChange={handleSetLink}
              ref={ref}
            />
            <span className="popup__error add-avatar-error"></span>
          </label>
        </div>
      </PopupWithForm>
    );
}