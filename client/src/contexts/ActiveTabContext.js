import React, { createContext, useState, useEffect } from 'react';

export const ActiveTabContext = createContext();

const ActiveTabContextProvider = props => {
  const [activeTab, setActiveTab] = useState('1');

  const toggleTab = tab => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
    localStorage.setItem('activeTab', tab);
  };

  useEffect(() => {
    const storedActiveTab = localStorage.getItem('activeTab');
    setActiveTab(storedActiveTab);
  }, []);

  return (
    <ActiveTabContext.Provider
      value={{
        activeTab,
        toggleTab
      }}
    >
      {props.children}
    </ActiveTabContext.Provider>
  );
};

export default ActiveTabContextProvider;
