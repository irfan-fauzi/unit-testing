import { itActAsFavoriteMovieModel } from './contract/favoriteMovieContract';
import FavoriteMovie from '../src/scripts/data/favorite-movie';

describe('Favorite movie idb contract test implementasi', () => {
  afterEach(async () => {
    (await FavoriteMovie.getAllMovies()).forEach(async (movie) => {
      await FavoriteMovie.deleteMovie(movie.id);
    });
  });

  itActAsFavoriteMovieModel(FavoriteMovie);
});
