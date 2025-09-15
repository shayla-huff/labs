import styles from './css/filter.module.css';

const Filters = ({titles, search, filterTitle, onSearchChange, onFilterChange, onReset, darkMode}) => {
    return (
        <div className={`${styles.filterContainer} ${darkMode ? styles.dark : ''}`}>

            <div className={styles.searchBox}>
                <label htmlFor="search">Search by name:</label>
                <input id="search" type="text" value={search} onChange={(e) => onSearchChange(e.target.value)} placeholder="Type a name!" />
            </div>

            <div className={styles.selectFilter}>
                <label htmlFor="select">Select a title:</label>
                <select id="select" value={filterTitle} onChange={(e) => onFilterChange(e.target.value)}>
                    <option value="">All</option>
                    {
                        titles.map(title => <option value={title}>{title}</option>)
                    }
                </select>
            </div>

            <button className={styles.resetButton} onClick={onReset}>Reset</button>
        </div>
    );
};

export default Filters;