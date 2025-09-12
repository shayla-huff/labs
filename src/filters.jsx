const Filters = ({titles, search, filterTitle, onSearchChange, onFilterChange, onReset}) => {
    return (
        <div className="filter-container">

            <div className="searchBox">
                <label htmlFor="search">Search by name:</label>
                <input id="search" type="text" value={search} onChange={(e) => onSearchChange(e.target.value)} placeholder="Type a name!" />
            </div>

            <div className="select-filter">
                <label htmlFor="select">Select a title:</label>
                <select id="select" value={filterTitle} onChange={(e) => onFilterChange(e.target.value)}>
                    <option value="">All</option>
                    {
                        titles.map(title => <option value={title}>{title}</option>)
                    }
                </select>
            </div>

            <button onClick={onReset}>Reset</button>

        </div>
    );
};

export default Filters;