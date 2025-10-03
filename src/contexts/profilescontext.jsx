import { createContext, useState } from 'react';

export const ProfilesContext = createContext();

export const ProfilesProvider = ({ children }) => {
  const [profiles, setProfiles] = useState([]);

  const addProfiles = (profiles) => {
    setProfiles((prev) => [...prev, profiles]);
  };

  return (
    <ProfilesContext.Provider value={{ profiles, setProfiles, addProfiles }}>
        {children}
    </ProfilesContext.Provider>
  );
};