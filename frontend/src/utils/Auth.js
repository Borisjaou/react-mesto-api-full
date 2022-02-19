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
    return fetch(`${this.url}/${'signup'}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    }).then(this._checkResponse);
  }

  loginUser(password, email) {
    return fetch(`${this.url}/${'signin'}`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    }).then(this._checkResponse);
  }

  checkToken(jwt) {
    return fetch(`${this.url}/${'users'}/${'me'}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    }).then(this._checkResponse);
  }
}

const options = {
  baseUrl: 'https://api.tomato.nomoredomains.work',
  headers: {
    'Content-Type': 'application/json',
  },
};

export const auth = new Auth(options);
