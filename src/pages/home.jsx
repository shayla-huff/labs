import { useState, useEffect, useContext } from 'react';
import { ModeContext } from '../contexts/ModeContext';
import { ProfileContext } from '../contexts/ProfileContext';
import { fetchTitles, fetchProfiles } from "../components/fetchdata.jsx";
import Intro, { getText } from '../components/intro';
import Cards from '../components/cards.jsx';
import Filters from '../components/filters.jsx';

const Home = () => {
    const { darkMode } = useContext(ModeContext);
    const { profiles, setProfiles } = useContext(ProfileContext);

    const [search, setSearch] = useState('');
    const [filterTitle, setFilterTitle] = useState('');
    const [titles, setTitles] = useState([]);

    useEffect(() => {
        const loadTitles = async () => {
            const data = await fetchTitles();
            setTitles(data.titles || []);
        };
        loadTitles();
    }, []);

    useEffect(() => {
        const loadProfiles = async () => {
            const data = await fetchProfiles(filterTitle, search);
            if (Array.isArray(data.profiles)) {
                setProfiles(data.profiles);
            } else if (Array.isArray(data)) {
                setProfiles(data);
            } else {
                setProfiles([]);
            }
        };
        loadProfiles();
    }, [filterTitle, search, setProfiles]);

    const handleReset = () => {
        setSearch('');
        setFilterTitle('');
    };

    return (
        <div>
            <Intro introText={getText()} />
            <Filters 
                titles={titles}
                search={search}
                filterTitle={filterTitle}
                onSearchChange={setSearch}
                onFilterChange={setFilterTitle}
                onReset={handleReset}
                darkMode={darkMode}
            />
            <Cards cards={profiles} />
        </div>
    );
};

export default Home;
