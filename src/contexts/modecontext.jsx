import { createContext, useState, useContext } from "react";

export const ModeContext = createContext();

export const ModeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);
    const toggleMode = () => setDarkMode(prev => !prev);

    return (
        <ModeContext.Provider value={{ darkMode, toggleMode }}>
            {children}
        </ModeContext.Provider>
    );
};