import FavoriteMovie from '../src/scripts/data/favorite-movie';
import { createLikeButtonPresenterWithMovie } from './helper/testFactories';

describe('Liking A Movie', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };

  beforeEach(() => {
    addLikeButtonContainer();
  });

  // test 1
  it('should show the like button when the movie has not been liked before', async () => {
    await createLikeButtonPresenterWithMovie({ id: 1 });
    expect(document.querySelector('[aria-label="like this movie"]')).toBeTruthy();
  });

  // test 2
  it('should not show the unlike button when the movie has not been liked before', async () => {
    await createLikeButtonPresenterWithMovie({ id: 1 });
    expect(document.querySelector('[aria-label="unlike this movie"]')).toBeFalsy();
  });

  // test 3
  it('should be able to like the movie', async () => {
    await createLikeButtonPresenterWithMovie({ id: 1 });
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    const movie = await FavoriteMovie.getMovie(1);
    expect(movie).toEqual({ id: 1 });
    await FavoriteMovie.deleteMovie(1);
  });

  // test 4
  it('should not add a movie again when its already liked', async () => {
    await createLikeButtonPresenterWithMovie({ id: 1 });
    // tambahkan film dengan ID 1 ke daftar film yang disukai
    await FavoriteMovie.putMovie({ id: 1 });
    // simulasikan pengguna menekan tombol suka film
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    // tidak ada film yang ganda
    expect(await FavoriteMovie.getAllMovies()).toEqual([{ id: 1 }]);
    await FavoriteMovie.deleteMovie(1);
  });

  // test 5
  it('should not add a movie when it has no id', async () => {
    await createLikeButtonPresenterWithMovie({});
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    expect(await FavoriteMovie.getAllMovies()).toEqual([]);
  });
});
