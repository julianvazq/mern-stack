import React, { createContext, useState } from 'react';

export const ActiveTabContext = createContext();

const ActiveTabContextProvider = props => {
  const [activeTab, setActiveTab] = useState('1');

  const toggleTab = tab => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

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
