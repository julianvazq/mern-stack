import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import useDataHandler from '../components/customHooks/useDataHandler';

export const AppointmentsContext = createContext();

const AppointmentsContextProvider = props => {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [response, error] = useDataHandler('/api/appointments');

  // POST request
  const addAppt = async input => {
    const res = await axios.post('/api/appointments', {
      name: input.name,
      date: input.date,
      time: input.time
    });
    // Use post response to set new state
    setAppointments(() => {
      const { _id, name, date, time } = res.data; // Set inside function to avoid "Identifier 'name' has already been declared"
      return [...appointments, { _id, name, date, time }];
    });
  };

  //POST (update) request
  const updateAppt = async ({ itemEditId: id, name, date, time }) => {
    await axios.post(`/api/appointments/${id}`, {
      name,
      date,
      time
    });
    // Use post response to set new state
    const newState = [...appointments];
    const index = appointments.findIndex(appointment => appointment._id === id);
    newState[index] = { _id: id, name, date, time };
    setAppointments(newState);
  };

  // DELETE request
  const deleteAppt = async id => {
    await axios.delete(`/api/appointments/${id}`);
    setAppointments(appointments.filter(appt => appt._id !== id));
  };

  useEffect(() => {
    if (error) {
      setIsLoading(false);
    } else if (!response) {
      setIsLoading(true);
    } else {
      setAppointments(response);
      setIsLoading(false);
    }
  }, [response, error]);

  return (
    <AppointmentsContext.Provider
      value={{
        appointments,
        deleteAppt,
        addAppt,
        updateAppt,
        isLoading,
        error
      }}
    >
      {props.children}
    </AppointmentsContext.Provider>
  );
};

export default AppointmentsContextProvider;
