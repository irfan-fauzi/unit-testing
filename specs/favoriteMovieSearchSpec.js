import FavoriteMovieSearchPresenter from '../src/scripts/views/pages/liked-movies/favoriteMovieSearchPresenter';

describe('searching movies', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="movie-search-container">
        <input id="query" type="text">
        <div class="movie-result-container">
          <ul class="movies">
          </ul>
        </div>
      </div>
      `;
  });

  it('should be abble to capture the query typed by the user', () => {
    const presenter = new FavoriteMovieSearchPresenter();
    const queryElement = document.getElementById('query');
    queryElement.value = 'venom';
    queryElement.dispatchEvent(new Event('change'));
    expect(presenter.userQuery).toEqual('venom');
  });
});
