import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ShoppingContext = createContext();

const ShoppingContextProvider = props => {
  const [loading, setLoading] = useState(false);
  const isLoading = isLoading => {
    setLoading(isLoading);
  };

  const [items, setItems] = useState([]);

  // POST request
  const addItem = name => {
    axios.post('/api/items', { name });
  };

  // DELETE request
  const deleteItem = id => {
    axios.delete(`/api/items/${id}`);
  };

  // Async/await inside useEffect Hook
  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const res = await axios.get('/api/items');
        setItems(res.data);
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    };

    fetchItems();
  }, [items]);

  return (
    <ShoppingContext.Provider
      value={{ items, deleteItem, addItem, loading, isLoading }}
    >
      {props.children}
    </ShoppingContext.Provider>
  );
};

export default ShoppingContextProvider;
