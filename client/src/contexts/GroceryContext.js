import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const GroceryContext = createContext();

const GroceryContextProvider = props => {
  const [loading, setLoading] = useState(false);
  const isLoading = isLoading => {
    setLoading(isLoading);
  };

  const [items, setItems] = useState([]);

  // GET request
  const getItems = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/items');
      if (res) {
        setItems(res.data);
      }
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  // POST request
  const addItem = async name => {
    await axios.post(`/api/items`, { name });
    getItems();
  };

  // DELETE request
  const deleteItem = async id => {
    await axios.delete(`/api/items/${id}`);
    getItems();
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <GroceryContext.Provider
      value={{
        items,
        deleteItem,
        addItem,
        loading,
        isLoading
      }}
    >
      {props.children}
    </GroceryContext.Provider>
  );
};

export default GroceryContextProvider;
