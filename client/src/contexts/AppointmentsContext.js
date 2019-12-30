import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AppointmentsContext = createContext();

const AppointmentsContextProvider = props => {
  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState([]);

  // GET request
  const getAppts = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/appointments');
      if (res) {
        setAppointments(res.data);
      }
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  // POST request
  const addAppt = async input => {
    await axios.post('/api/appointments', {
      name: input.name,
      date: input.date,
      time: input.time
    });
    getAppts();
  };

  // DELETE request
  const deleteAppt = async id => {
    await axios.delete(`/api/appointments/${id}`);
    getAppts();
  };

  useEffect(() => {
    getAppts();
  }, []);

  return (
    <AppointmentsContext.Provider
      value={{
        appointments,
        deleteAppt,
        addAppt,
        loading
      }}
    >
      {props.children}
    </AppointmentsContext.Provider>
  );
};

export default AppointmentsContextProvider;
