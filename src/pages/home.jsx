import Intro, { getText } from '../components/intro';
import Cards from '../components/cards.jsx';
import Filters from '../components/filters.jsx'
import { useState, useEffect } from 'react';
import { fetchTitles, fetchProfiles } from "../components/fetchdata.jsx";

const Home = ({ cards, setCards, darkMode }) => {
    const [search, setSearch] = useState('');
    const [filterTitle, setFilterTitle] = useState('');
    const [titles, setTitles] = useState([]);

    useEffect(() => {
        const fetchTitles = async () => {
            const response = await fetch('https://web.ics.purdue.edu/~zong6/profile-app/get-titles.php');
            const data = await response.json();
            setTitles(data.titles || []);
        };
        fetchTitles();
    }, []);

    useEffect(() => {
        const fetchFilteredCards = async () => {
            const response = await fetch(`https://web.ics.purdue.edu/~zong6/profile-app/fetch-data-with-filter.php?title=${filterTitle}&name=${search}&page=1&limit=10`);
            const data = await response.json();
            if (Array.isArray(data.profiles)) setCards(data.profiles);
            else if (Array.isArray(data)) setCards(data);
            else setCards([]);
        };
        fetchFilteredCards();
    }, [filterTitle, search, setCards]);

    useEffect(() => {
        const getTitles = async () => setTitles(await fetchTitles());
        getTitles();
    }, []);

    useEffect(()=> {
        const getFilteredCards = async () => setCards(await fetchProfiles(filterTitle, search));
        getFilteredCards();
    }, [filterTitle, search]);

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
            <Cards cards={cards}/>
        </div>
    );
};

export default Home;