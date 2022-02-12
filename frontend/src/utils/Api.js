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
    }).then(this._checkResponse);
  }

  getUserInfo() {
    return fetch(`${this.url}/${'users'}/${'me'}`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  getInitialCards() {
    return fetch(`${this.url}/${'cards'}`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  editProfile(userName, info) {
    return fetch(`${this.url}/${'users'}/${'me'}`, {
      method: 'PATCH',
      headers: this._headers,
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
    }).then(this._checkResponse);
  }

  changeLikeCardStatus(id, isLiked) {
    return fetch(`${this.url}/${'cards'}/${'likes'}/${id}`, {
      method: isLiked ? 'PUT' : 'DELETE',
      headers: this._headers,
    }).then(this._checkResponse);
  }
  likeCard(id) {
    return fetch(`${this.url}/${'cards'}/${'likes'}/${id}`, {
      method: 'PUT',
      headers: this._headers,
    }).then(this._checkResponse);
  }

  unlikeCard(id) {
    return fetch(`${this.url}/${'cards'}/${'likes'}/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._checkResponse);
  }

  editAvatar(link) {
    return fetch(`${this.url}/${'users'}/${'me'}/${'avatar'}`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link,
      }),
    }).then(this._checkResponse);
  }
} //end

const options = {
  baseUrl: 'api.tomato.nomoredomains.work',
  headers: {
    authorization: 'ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQCbYSZXT0/TPxbOwjQP1G8wQFyBL3uBVHrbxCT+x22gLu9rccdz1T/vmhpwRtPdQDIzZfcL4xyhIXmfk2F/yDpKENodzX3uSuS3Q2S0l+ssKs2bGx7IUET/p8A2tykz0lFBzz6ufzgOof9kt0QG0CSQc8v/lFXR1tZEeAB36nfpiS85tV47iX4TBlKOS1iSKXKqxG/f2G6St/E6m1W7W6R5FbgtYW/hhlO9dkPVYbadDfVC+ehfnO05DFCroJp9pTQNJqFdEgrnuSibrpqVCpABFyn+Nqics7kHftXhv3HPM0KhI5RkrpUG3W8xGURXYd1VP6d66uhGHr2R+sbN+9K29q8lRfrc6jZL24573B7ZGJMa4QbUmuO149xkBTY4cQhFg3jGM6jqz0pcYVZ25MvMMYSTfaIwQS87M9vBJDV6or1bhFyiNmfGzFWe4Ua0xhWwDCc0v2puMjzYdWkN9iG72r4FFEM5iAiq9u6b95jZgiUBaqcc4Bj91vROjeRLbR2ILkomUvQKP3Cpw0twvqzzPnxgrXn4IFvy3xmWjJvY8gw7verbRiF9/W2lmu25v2bk5B0M44+wpkkI10sBWtuYkCYlLCFgOgrBF6dng1O7MzOr6m7IBVQdg5DNUMnAr6X0uhYj2IM0tKNgqWI75hhDlC8m8kAKahkYjSH5ip0+Uw== 366793@gmail.com@84.201.138.86',
    'Content-Type': 'application/json',
  },
};

export const api = new Api(options);
