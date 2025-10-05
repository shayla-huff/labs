import styles from '../css/navbar.module.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { ModeContext } from '../contexts/ModeContext'; 

const Header = () => {
    const { darkMode, toggleMode } = useContext(ModeContext);

  return (
    <header className={darkMode ? "header-dark" : "header-light"}>
      <h1>My Profiles App</h1>
      <button onClick={toggleMode}>
        {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </button>
    </header>
  );
};

export default Header;