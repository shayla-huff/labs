const Filters = ({titles, onChange}) => {
    return (
        <div className="filter-container">
            <div className="select-filter">
                <label htmlFor="select">Select a title:</label>
                <select id="select" onChange={onChange}>
                    <option value="">All</option>
                    {
                        titles.map(title => <option value={title}>{title}</option>)
                    }
                </select>
            </div>
        </div>
    )
}

export default Filters