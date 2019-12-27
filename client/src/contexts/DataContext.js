import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import uuid from 'uuid';

export const DataContext = createContext();

const DataContextProvider = props => {
  const [loading, setLoading] = useState(false);
  const isLoading = isLoading => {
    setLoading(isLoading);
  };
  // const [appointments, setAppointments] = useState([
  //   { name: 'Doctor appointment.', date: 'Jan 01', time: '7:15', _id: uuid() },
  //   {
  //     name: 'Meeting with coworkers.',
  //     date: 'Feb 02',
  //     time: '10:30',
  //     _id: uuid()
  //   },
  //   { name: 'Massage.', date: 'Mar 03', time: '5:45', _id: uuid() },
  //   { name: 'Lunch with clients.', date: 'May 04', time: '12:30', _id: uuid() }
  // ]);
  const [appointments, setAppointments] = useState([]);
  const [items, setItems] = useState([]);

  // POST request
  const addItem = (input, model) => {
    if (model === 'items') {
      axios.post(`/api/${model}`, { name: input.name });
    } else if (model === 'appointments') {
      axios.post(`/api/${model}`, {
        name: input.name,
        date: input.date,
        time: input.time
      });
    }
  };

  // DELETE request
  const deleteItem = (id, model) => {
    axios.delete(`/api/${model}/${id}`);
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

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const res = await axios.get('/api/appointments');
        setAppointments(res.data);
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    };

    fetchItems();
  }, [appointments]);

  return (
    <DataContext.Provider
      value={{ items, appointments, deleteItem, addItem, loading, isLoading }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
