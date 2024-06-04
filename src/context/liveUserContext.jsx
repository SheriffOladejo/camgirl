import React, { createContext, useState, useContext } from 'react';

const LiveUsersContext = createContext();

export const useLiveUsers = () => useContext(LiveUsersContext);

export const LiveUsersProvider = ({ children }) => {
  const [liveUsers, setLiveUsers] = useState([]);

  const userStartsLiveSession = userId => {
    // Update liveUsers state
  };

  const userEndsLiveSession = userId => {
    // Update liveUsers state
  };

  return (
    <LiveUsersContext.Provider value={{ liveUsers, userStartsLiveSession, userEndsLiveSession }}>
      {children}
    </LiveUsersContext.Provider>
  );
};
