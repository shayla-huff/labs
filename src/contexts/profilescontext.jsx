import { createContext, useReducer } from 'react';

export const ProfilesContext = createContext();

const profilesReducer = (state, action) => {
  switch (action.type) {
    case "ADD_PROFILES":
      return [...state, ...action.payload];
    case "REMOVE_PROFILES":
      return state.filter((profile) => profile.id !== action.payload);
    default:
      return state;
  }
};

export const ProfilesProvider = ({ children }) => {
  const [profiles, dispatch] = useReducer(profilesReducer, []);

  const addProfiles = (profiles) => {
    dispatch({ type: "ADD_PROFILES", payload: profiles });
  };

  const removeProfiles = (id) => {
    dispatch({ type: "REMOVE_PROFILES", payload: id });
  };

  return (
    <ProfilesContext.Provider value={{ profiles, addProfiles, removeProfiles }}>
        {children}
    </ProfilesContext.Provider>
  );
};