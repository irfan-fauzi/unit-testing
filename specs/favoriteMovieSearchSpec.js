import FavoriteMovie from '../src/scripts/data/favorite-movie';
import FavoriteMovieSearchPresenter from '../src/scripts/views/pages/liked-movies/favoriteMovieSearchPresenter';

describe('searching movies', () => {
  let presenter;
  const searchMovie = (query) => {
    const queryElement = document.getElementById('query');
    queryElement.value = query;
    queryElement.dispatchEvent(new Event('change'));
  };

  const searchMovieContainer = () => {
    document.body.innerHTML = `
      <div id="movie-search-container">
        <input id="query" type="text">
        <div class="movie-result-container">
          <ul class="movies">
            <li class="movie">
              <span class="movie__title">Film Satu</span>
            </li>
          </ul>
        </div>
      </div>
      `;
  };

  const constructorPresenter = () => {
    spyOn(FavoriteMovie, 'searchMovies');
    presenter = new FavoriteMovieSearchPresenter({ favoriteMovies: FavoriteMovie });
  };

  beforeEach(() => {
    searchMovieContainer();
    constructorPresenter();
  });

  // test 1
  it('should be abble to capture the query typed by the user', () => {
    searchMovie('film anu');
    expect(presenter.latestQuery).toEqual('film anu');
  });

  // test 2
  it('should ask the model to search for liked movies', () => {
    searchMovie('film anu');
    expect(FavoriteMovie.searchMovies)
      .toHaveBeenCalledWith('film anu');
  });

  // test 3
  it('should show the found movies', () => {
    presenter._showFoundMovies([{ id: 1 }]);
    expect(document.querySelectorAll('.movie').length).toEqual(1);

    presenter._showFoundMovies([
      { id: 1, title: 'avengers' },
      { id: 2, title: 'man in black' },
    ]);
    expect(document.querySelectorAll('.movie').length).toEqual(2);
  });
});
