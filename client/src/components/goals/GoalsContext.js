import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import useDataHandler from '../customHooks/useDataHandler';

export const GoalsContext = createContext();

const GoalsContextProvider = props => {
  const [goals, setGoals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [response, error] = useDataHandler('/api/goals');

  // POST request
  const addGoal = async input => {
    const res = await axios.post('/api/goals', {
      name: input.name,
      timeline: input.timeline,
      deadline: input.deadline
    });

    // Use post response to set new state
    setGoals(() => {
      const { _id, name, timeline, deadline } = res.data; // Set inside function to avoid "Identifier 'name' has already been declared"
      return [...goals, { _id, name, timeline, deadline }];
    });
  };

  //POST (update) request
  const updateGoal = async ({ id, name, timeline, deadline }) => {
    await axios.post(`/api/goals/${id}`, {
      name,
      timeline,
      deadline
    });
    // Use post response to set new state
    const newState = [...goals];
    const index = goals.findIndex(goal => goal._id === id);
    newState[index] = { _id: id, name, timeline, deadline };
    setGoals(newState);
  };

  // DELETE request
  const deleteGoal = async id => {
    await axios.delete(`/api/goals/${id}`);
    setGoals(goals.filter(goal => goal._id !== id));
  };

  useEffect(() => {
    if (error) {
      setIsLoading(false);
    } else if (!response) {
      setIsLoading(true);
    } else {
      setGoals(response);
      setIsLoading(false);
    }
  }, [response, error]);

  return (
    <GoalsContext.Provider
      value={{
        goals,
        deleteGoal,
        addGoal,
        updateGoal,
        isLoading,
        error
      }}
    >
      {props.children}
    </GoalsContext.Provider>
  );
};

export default GoalsContextProvider;
