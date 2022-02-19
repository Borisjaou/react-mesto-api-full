class Api {
  constructor(config) {
    this.url = config.baseUrl;
    this._headers = config.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }

  listItem() {
    return fetch(this._url, {
      headers: this._headers,
      credentials: 'include',
    }).then(this._checkResponse);
  }

  getUserInfo() {
    return fetch(`${this.url}/${'users'}/${'me'}`, {
      headers: this._headers,
      credentials: 'include',
    }).then(this._checkResponse);
  }

  getInitialCards() {
    return fetch(`${this.url}/${'cards'}`, {
      headers: this._headers,
      credentials: 'include',
    }).then(this._checkResponse);
  }

  editProfile(userName, info) {
    return fetch(`${this.url}/${'users'}/${'me'}`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name: userName,
        about: info,
      }),
    }).then(this._checkResponse);
  }

  addNewCard(name, link) {
    return fetch(`${this.url}/${'cards'}`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._checkResponse);
  }

  deletCard(id) {
    return fetch(`${this.url}/${'cards'}/${id}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include',
    }).then(this._checkResponse);
  }

  changeLikeCardStatus(id, isLiked) {
    return fetch(`${this.url}/${'cards'}/${'likes'}/${id}`, {
      method: isLiked ? 'PUT' : 'DELETE',
      headers: this._headers,
      credentials: 'include',
    }).then(this._checkResponse);
  }
  likeCard(id) {
    return fetch(`${this.url}/${'cards'}/${'likes'}/${id}`, {
      method: 'PUT',
      headers: this._headers,
      credentials: 'include',
    }).then(this._checkResponse);
  }

  unlikeCard(id) {
    return fetch(`${this.url}/${'cards'}/${'likes'}/${id}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include',
    }).then(this._checkResponse);
  }

  editAvatar(link) {
    return fetch(`${this.url}/${'users'}/${'me'}/${'avatar'}`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        avatar: link,
      }),
    }).then(this._checkResponse);
  }
} //end

const options = {
  baseUrl: 'api.tomato.nomoredomains.work',
  headers: {
    'Content-Type': 'application/json',
  },
};

export const api = new Api(options);
