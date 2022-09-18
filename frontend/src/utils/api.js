class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  _handleResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards(token) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then(this._handleResponse);
  }

  getUserInfo(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then(this._handleResponse);
  }

  getAllData(token) {
    return Promise.all([this.getInitialCards(token), this.getUserInfo(token)]);
  }

  changeUserInfo(data, token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(this._handleResponse);
  }

  addCard(data, token) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(this._handleResponse);
  }

  delCard(id, token) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then(this._handleResponse);
  }

  toggleLike(id, status, token) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: status ? "DELETE" : "PUT",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then(this._handleResponse);
  }

  changeAvatar(data, token) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(this._handleResponse);
  }
}

const api = new Api({
  baseUrl: "http://localhost:3001",
});

export default api;
