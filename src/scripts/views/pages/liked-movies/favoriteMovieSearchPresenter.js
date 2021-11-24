class FavoriteMovieSearchPresenter {
  constructor({ favoriteMovies }) {
    this._listenToSearchRequestByUser();
    this._favoriteMovies = favoriteMovies;
  }

  _listenToSearchRequestByUser() {
    this._queryElement = document.getElementById('query');
    this._queryElement.addEventListener('change', (event) => {
      this._searchQuery(event.target.value);
    });
  }

  _searchQuery(latestQuery) {
    this._latestQuery = latestQuery;
    this._favoriteMovies.searchMovies(this._latestQuery);
  }

  // eslint-disable-next-line class-methods-use-this
  _showFoundMovies(movies) {
    const html = movies.reduce(
      // eslint-disable-next-line no-unused-vars
      (carry, movie) => carry.concat('<li class="movie"></li>'),
      '',
    );
    document.querySelector('.movies').innerHTML = html;
  }

  get latestQuery() {
    return this._latestQuery;
  }
}

export default FavoriteMovieSearchPresenter;
