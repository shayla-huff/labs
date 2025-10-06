import { useContext } from "react";
import { ModeContext } from "../contexts/ModeContext";

const Header = () => {
    const { darkMode, toggleMode } = useContext(ModeContext);
    
  return (
    <header>
      <h1>My App</h1>
      <button onClick={toggleMode}>
        Switch to {darkMode ? "Light" : "Dark"} Mode
      </button>
    </header>
  );
};

export default Header;
