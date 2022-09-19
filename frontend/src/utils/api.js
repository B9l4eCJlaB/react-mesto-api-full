class Api {
    constructor(options) {
      this._url = options.url;
    }
    _checkResponse(res) {
        if(res.ok) {
            return res.json(); 
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    getUserInfo(token) {
        return fetch(this._url + '/users/me', {
            method: 'GET',
            headers: {
                authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
        })
        .then(this._checkResponse)
    }
    getInitialCards(token) {
        return fetch(this._url + '/cards', {
            method: 'GET',
            headers: {
                authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
        })
        .then(this._checkResponse)
    }
    setUserInfoApi(data, token) {
        return fetch(this._url + '/users/me', {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
        .then(this._checkResponse)
    }
    addUserCard(data, token) {
        return fetch(this._url + '/cards', {
            method: 'POST',
            headers: {
                authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
        .then(this._checkResponse)
    }
    like(id, token) {
        return fetch(this._url + `/cards/likes/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
        })
        .then(this._checkResponse)
    }
    dislike(id, token) {
        return fetch(this._url + `/cards/likes/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
          })
          .then(this._checkResponse)
    }
    delete(id, token) {
        return fetch(this._url + `/cards/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
        })
        .then(this._checkResponse)
    }
    handleAvatar(data, token) {
        return fetch(this._url + '/users/me/avatar', {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
        .then(this._checkResponse)
    }

    getAllData(token) {
        return Promise.all([this.getInitialCards(token),this.getUserInfo(token)])
    }

    changeLikeCardStatus(id, status, token) {
        return fetch(`${this._url}/cards/${id}/likes`, {
          method: status ? "DELETE" : "PUT",
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }).then(this._checkResponse);
      }
}

  const api = new Api({
    url: 'http://localhost:3001',
    headers: {
      authorization: 'Bearer 384056b5ececd68c39b75293fdce41f0741594db8dbd96263625bb68b92dde34',
      'Content-Type': 'application/json'
    }
})

export default api
