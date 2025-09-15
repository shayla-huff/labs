import styles from './css/navbar.module.css';

const Header = ({onToggleMode, darkMode}) => {
    return (
        <header className={darkMode ? styles.darkHeader : styles.lightHeader}>
        <nav className={styles.navbar}>
            <ul>
                <li>Home</li>
                <li>About</li>
                <li>Profiles</li>
            </ul>
        <button className={styles.modeButton} onClick={onToggleMode}>
            {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </button>
        </nav>
        </header>
    );
};

export default Header;