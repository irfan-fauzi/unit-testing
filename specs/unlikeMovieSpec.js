import FavoriteMovie from '../src/scripts/data/favorite-movie';
import { createLikeButtonPresenterWithMovie } from './helper/testFactories';

const addLikeButtonContainer = () => {
  document.body.innerHTML = '<div id="likeButtonContainer"></div>';
};

describe('Unliking A Movie', () => {
  beforeEach(async () => {
    addLikeButtonContainer();
    await FavoriteMovie.putMovie({ id: 1 });
  });
  afterEach(async () => {
    await FavoriteMovie.deleteMovie(1);
  });

  // test 1
  it('should display unlike widget when the movie has been liked', async () => {
    await createLikeButtonPresenterWithMovie({ id: 1 });
    expect(document.querySelector('[aria-label="unlike this movie"]')).toBeTruthy();
  });

  // test 2
  it('should not display like widget when the movie has been liked', async () => {
    await createLikeButtonPresenterWithMovie({ id: 1 });
    expect(document.querySelector('[aria-label="like this movie"]')).toBeFalsy();
  });

  // test 3
  it('should be able to remove liked movie from the list', async () => {
    await createLikeButtonPresenterWithMovie({ id: 1 });
    document.querySelector('[aria-label="unlike this movie"]').dispatchEvent(new Event('click'));
    expect(await FavoriteMovie.getAllMovies()).toEqual([]);
  });

  // test 4
  it('should not throw error if the unliked movie is not in the list', async () => {
    await createLikeButtonPresenterWithMovie({ id: 1 });
    // hapus dulu film dari daftar film yang disukai
    await FavoriteMovie.deleteMovie(1);
    // kemudian simulasikan pengguna menekan widget batal menykai film
    document.querySelector('[aria-label="unlike this movie"]').dispatchEvent(new Event('click'));
    expect(await FavoriteMovie.getAllMovies()).toEqual([]);
  });
});
