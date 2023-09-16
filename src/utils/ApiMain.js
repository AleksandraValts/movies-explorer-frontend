class ApiMain {
  constructor (config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _checkResponse(res) {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(res.status);
      }
  }

  getUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify(data),
    }).then((res) => this._checkResponse(res));
  }

  changeUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
      }),
    }).then((res) => this._checkResponse(res));
  }

  saveMovie(data) {
    return fetch(`${this._url}/movies`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify(data),
    }).then((res) => this._checkResponse(res));
  };

  getSavedMovies() {
    return fetch(`${this._url}/movies`, {
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    }).then((res) => this._checkResponse(res));
  };

  deleteSavedMovie(id) {
    return fetch(`${this._url}/movies/${id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    }).then((res) => { return this._checkResponse(res)});
  };
};

const apiMain = new ApiMain({
url: 'https://api.valts.movies.nomoredomainsicu.ru',
headers: {
  'content-type': 'application/json',
  authorization: `Bearer ${localStorage.getItem('jwt')}`,
},
});

export default apiMain;