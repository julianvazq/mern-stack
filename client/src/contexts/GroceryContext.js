import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import useDataHandler from '../components/customHooks/useDataHandler';

export const GroceryContext = createContext();

const GroceryContextProvider = props => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [response, error] = useDataHandler('/api/items');

  // POST request
  const addItem = async input => {
    const res = await axios.post(`/api/items`, {
      name: input.name,
      quantity: input.quantity
    });
    // Use post response to set new state
    setItems(() => {
      const { _id, name, quantity } = res.data; // Set inside function to avoid "Identifier 'name' has already been declared"
      return [...items, { _id, name, quantity }];
    });
  };

  // DELETE request
  const deleteItem = async id => {
    await axios.delete(`/api/items/${id}`);
    setItems(items.filter(item => item._id !== id));
  };

  const updateItem = async => {
    console.log('editting...');
  };

  useEffect(() => {
    if (error) {
      setIsLoading(false);
    } else if (!response) {
      setIsLoading(true);
    } else {
      setItems(response);
      setIsLoading(false);
    }
  }, [response, error]);

  return (
    <GroceryContext.Provider
      value={{
        items,
        deleteItem,
        addItem,
        updateItem,
        isLoading,
        error
      }}
    >
      {props.children}
    </GroceryContext.Provider>
  );
};

export default GroceryContextProvider;
