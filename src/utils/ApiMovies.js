class ApiMovies {
    constructor(config) {
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
  
    getMovies() {
      return fetch(`${this._url}`, {
        headers: this._headers,
      }).then((res) => this._checkResponse(res));
    };
  };
  
  const apiMovies = new ApiMovies({
    baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  export default apiMovies;