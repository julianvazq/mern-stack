import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import useDataHandler from '../components/customHooks/useDataHandler';

export const MoodsContext = createContext();

const MoodsContextProvider = props => {
  const [moods, setMoods] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [response, error] = useDataHandler('/api/moods');

  // POST request
  const addMood = async input => {
    const res = await axios.post('/api/moods', {
      mood: input.mood,
      thought: input.thought
    });

    // Use post response to set new state
    setMoods(() => {
      const { _id, mood, thought } = res.data; // Set inside function to avoid "Identifier 'name' has already been declared"
      return [...moods, { _id, mood, thought }];
    });
  };

  // DELETE request
  const deleteMood = async id => {
    await axios.delete(`/api/moods/${id}`);
    setMoods(moods.filter(mood => mood._id !== id));
  };

  useEffect(() => {
    if (error) {
      setIsLoading(false);
    } else if (!response) {
      setIsLoading(true);
    } else {
      setMoods(response);
      setIsLoading(false);
    }
  }, [response, error]);

  return (
    <MoodsContext.Provider
      value={{
        moods,
        deleteMood,
        addMood,
        isLoading,
        error
      }}
    >
      {props.children}
    </MoodsContext.Provider>
  );
};

export default MoodsContextProvider;
