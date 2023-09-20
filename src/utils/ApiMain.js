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

  saveMovie(movie) {
    return fetch(`${this._url}/movies`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify({
        movieId: movie.id,
        nameRU: movie.nameRU,
        image: 'https://api.nomoreparties.co' + movie.image.url,
        trailerLink: movie.trailerLink,
        duration: movie.duration,
        country: movie.country,
        director: movie.director,
        year: movie.year,
        description: movie.description,
        thumbnail: 'https://api.nomoreparties.co' + movie.image.formats.thumbnail.url,
        owner: movie.owner,
        nameEN: movie.nameEN,
      }),
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
url: 'http://localhost:3000',
headers: {
  'content-type': 'application/json',
  authorization: `Bearer ${localStorage.getItem('jwt')}`,
},
});

export default apiMain;