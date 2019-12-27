import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import uuid from 'uuid';

export const DataContext = createContext();

const DataContextProvider = props => {
  const [loading, setLoading] = useState(false);
  const isLoading = isLoading => {
    setLoading(isLoading);
  };

  const [appointments, setAppointments] = useState([]);
  const [items, setItems] = useState([]);

  // POST request
  const addItem = async (input, model) => {
    if (model === 'items') {
      await axios.post(`/api/${model}`, { name: input.name });
      getNewState(model);
    } else if (model === 'appointments') {
      await axios.post(`/api/${model}`, {
        name: input.name,
        date: input.date,
        time: input.time
      });
      getNewState(model);
    }
  };

  // DELETE request
  const deleteItem = async (id, model) => {
    await axios.delete(`/api/${model}/${id}`);
    getNewState(model);
  };

  // Updates state after POST/DELETE outside of useEffect to avoid infinite loop
  const getNewState = async model => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/${model}`);
      console.log(`fetched ${model} data`);
      if (model === 'items') {
        setItems(res.data);
      } else if (model === 'appointments') {
        setAppointments(res.data);
      }
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  // Async/await inside useEffect Hook
  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const res = await axios.get('/api/items');
        console.log('fetched shopping data');
        setItems(res.data);
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const res = await axios.get('/api/appointments');
        console.log('fetched appointment data');
        setAppointments(res.data);
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  // useEffect(() => {
  //   setLoading(true);
  //   try {
  //     axios
  //       .get('/api/appointments')
  //       .then(res => {
  //         console.log('fetched appointment data');
  //         return res;
  //       })
  //       .then(res => setAppointments(res.data));

  //     setLoading(false);
  //   } catch (e) {
  //     console.log(e);
  //     setLoading(false);
  //   }
  // }, []);

  return (
    <DataContext.Provider
      value={{
        items,
        appointments,
        deleteItem,
        addItem,
        loading,
        isLoading
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;