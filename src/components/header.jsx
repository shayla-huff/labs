import styles from '../css/navbar.module.css';
import { Link } from 'react-router-dom';

const Header = ({ toggleMode, darkMode }) => {
    return (
        <header className={darkMode ? styles.darkHeader : styles.lightHeader}>
            <nav className={styles.navbar}>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/otherprofiles">Profiles</Link></li>
                </ul>
            </nav>

            <button className={styles.modeButton} onClick={toggleMode}>
                {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            </button>
        </header>
    );
};

export default Header;