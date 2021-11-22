const itActAsFavoriteMovieModel = (favoriteMovie) => {
  // test 1 pass
  it('should return the movie that has been added', async () => {
    favoriteMovie.putMovie({ id: 1 });
    favoriteMovie.putMovie({ id: 2 });

    expect(await favoriteMovie.getMovie(1))
      .toEqual({ id: 1 });
    expect(await favoriteMovie.getMovie(2))
      .toEqual({ id: 2 });
    expect(await favoriteMovie.getMovie(3))
      .toEqual(undefined);
  });

  // test 2
  it('should refuse a movie from being added if it does not have the correct property', async () => {
    favoriteMovie.putMovie({ aProperty: 'property' });
    expect(await favoriteMovie.getAllMovies())
      .toEqual([]);
  });

  // test 3
  it('can return all of the movies that have been added', async () => {
    favoriteMovie.putMovie({ id: 1 });
    favoriteMovie.putMovie({ id: 2 });
    expect(await favoriteMovie.getAllMovies())
      .toEqual([
        { id: 1 },
        { id: 2 },
      ]);
  });

  // test 4
  it('should remove favorite movie', async () => {
    favoriteMovie.putMovie({ id: 1 });
    favoriteMovie.putMovie({ id: 2 });
    favoriteMovie.putMovie({ id: 3 });

    await favoriteMovie.deleteMovie(1);
    expect(await favoriteMovie.getAllMovies())
      .toEqual([
        { id: 2 },
        { id: 3 },
      ]);
  });

  // test 5
  it('shold hendle request to remove a movie even trough the movie has not been added', async () => {
    favoriteMovie.putMovie({ id: 1 });
    favoriteMovie.putMovie({ id: 2 });
    favoriteMovie.putMovie({ id: 3 });

    await favoriteMovie.deleteMovie(4);
    expect(await favoriteMovie.getAllMovies())
      .toEqual([
        { id: 1 },
        { id: 2 },
        { id: 3 },
      ]);
  });
};

// eslint-disable-next-line import/prefer-default-export
export { itActAsFavoriteMovieModel };
