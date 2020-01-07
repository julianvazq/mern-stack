import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import useDataHandler from '../customHooks/useDataHandler';

export const BooksContext = createContext();

const BooksContextProvider = props => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [response, error] = useDataHandler('/api/books');

  // POST request
  const addBook = async input => {
    const res = await axios.post(`/api/books`, {
      title: input.title,
      author: input.author
    });
    // Use post response to set new state
    setBooks(books => {
      const { _id, title, author } = res.data; // Set inside function to avoid "Identifier 'title' has already been declared"
      return [...books, { _id, title, author }];
    });
  };

  //PUT request
  const updateBook = async ({ id, title, author }) => {
    await axios.post(`/api/books/${id}`, {
      title: title,
      author: author
    });
    // Update current state
    const newState = [...books];
    const index = books.findIndex(book => book._id === id);
    newState[index] = { _id: id, title, author };
    setBooks(newState);
  };

  // DELETE request
  const deleteBook = async id => {
    await axios.delete(`/api/books/${id}`);
    setBooks(books.filter(book => book._id !== id));
  };

  useEffect(() => {
    if (error) {
      setIsLoading(false);
    } else if (!response) {
      setIsLoading(true);
    } else {
      setBooks(response);
      setIsLoading(false);
    }
  }, [response, error]);

  return (
    <BooksContext.Provider
      value={{
        books,
        deleteBook,
        addBook,
        updateBook,
        isLoading,
        error
      }}
    >
      {props.children}
    </BooksContext.Provider>
  );
};

export default BooksContextProvider;
