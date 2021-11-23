import FavoriteMovie from '../../src/scripts/data/favorite-movie';
import LikeButtonPresenter from '../../src/scripts/utils/like-button-presenter';

const createLikeButtonPresenterWithMovie = async (movie) => {
  await LikeButtonPresenter.init({
    likeButtonContainer: document.querySelector('#likeButtonContainer'),
    favoriteMovies: FavoriteMovie,
    movie,
  });
};

// eslint-disable-next-line import/prefer-default-export
export { createLikeButtonPresenterWithMovie };
