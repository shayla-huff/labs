import { createContext, useState } from 'react';

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState([]);

  const addProfile = (profile) => {
    setProfiles((prev) => [...prev, profile]);
  };

  return (
    <ProfileContext.Provider value={{ profiles, setProfiles, addProfile }}>
        {children}
    </ProfileContext.Provider>
  );
};