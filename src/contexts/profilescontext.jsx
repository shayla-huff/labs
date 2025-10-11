import { createContext, useReducer, useCallback, useMemo } from 'react';

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

  const addProfiles = useCallback ((newProfiles) => {
    dispatch({ type: "ADD_PROFILES", payload: newProfiles });
  }, []);

  const removeProfiles = useCallback((id) => {
    dispatch({ type: "REMOVE_PROFILES", payload: id });
  }, []);

  const value = useMemo(() => ({ profiles, addProfiles, removeProfiles }),
    [profiles, addProfiles, removeProfiles]
  );

  return (
    <ProfilesContext.Provider value={value}>
        {children}
    </ProfilesContext.Provider>
  );
};