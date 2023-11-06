class Api {
  constructor(options) {
    this._url = options.url;
  }

  _checkError(res) {
    if(res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}, ${res.statusText}`);
  }

  getInitialCards(token) {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(this._checkError);
  }

  getInfo(token) {
    return fetch(`${this._url}/users/me`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(this._checkError);
  }

  setInfo(data, token) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        'Content-Type' : 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        name: data.title,
        about: data.description
      }),
    })
    .then(this._checkError);
  }

  addCard(data, token) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: {
        'Content-Type' : 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then(this._checkError);
  }

  setAvatar(data, token) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        'Content-Type' : 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
    .then(this._checkError)
  }

  addLike(cardId, token) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(this._checkError)
  }

  removeLike(cardId, token) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(this._checkError)
  }

  deleteCard(cardId, token) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(this._checkError)
  }

}

const api = new Api({
  url: "api.normal.nomoredomainsmonster.ru",
});

export default api;