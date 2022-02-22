class Auth {
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

  registerUser(password, email) {
    return fetch(`${this.url}/${'sign-up'}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    }).then(this._checkResponse);
  }

  loginUser(password, email) {
    return fetch(`${this.url}/${'sign-in'}`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    }).then(this._checkResponse);
  }

  logOutUser() {
    return fetch(`${this.url}/${'sign-out'}`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
    }).then(this._checkResponse);
  }


  /*   checkToken(jwt) {
      return fetch(`${this.url}/${'users'}/${'me'}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      }).then(this._checkResponse);
    } */
}

const options = {
  baseUrl: 'https://api.tomato.nomoredomains.work',
  headers: {
    'Content-Type': 'application/json',
  },
};

export const auth = new Auth(options);
