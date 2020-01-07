import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import useDataHandler from '../customHooks/useDataHandler';

export const MoviesContext = createContext();

const MoviesContextProvider = props => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [response, error] = useDataHandler('/api/movies');

  // POST request
  const addMovie = async input => {
    const res = await axios.post(`/api/movies`, {
      title: input.title,
      genre: input.genreInput
    });
    // Use post response to set new state
    setMovies(movies => {
      const { _id, title, genre } = res.data; // Set inside function to avoid "Identifier 'title' has already been declared"
      return [...movies, { _id, title, genre }];
    });
  };

  //PUT request
  const updateMovie = async ({ id, title, genreInput: genre }) => {
    await axios.post(`/api/movies/${id}`, {
      title: title,
      genre: genre
    });
    // Update current state
    const newState = [...movies];
    const index = movies.findIndex(movie => movie._id === id);
    newState[index] = { _id: id, title, genre };
    setMovies(newState);
  };

  // DELETE request
  const deleteMovie = async id => {
    await axios.delete(`/api/movies/${id}`);
    setMovies(movies.filter(movie => movie._id !== id));
  };

  useEffect(() => {
    if (error) {
      setIsLoading(false);
    } else if (!response) {
      setIsLoading(true);
    } else {
      setMovies(response);
      setIsLoading(false);
    }
  }, [response, error]);

  return (
    <MoviesContext.Provider
      value={{
        movies,
        deleteMovie,
        addMovie,
        updateMovie,
        isLoading,
        error
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
