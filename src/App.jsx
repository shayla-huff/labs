import styles from './css/app.module.css';
import Header from './header.jsx';
import Introduction, { getText } from './intro.jsx';
import Card from './cards.jsx';
import Filters from './filters.jsx'
import ProfileForm from './profileform.jsx';
import { useState, useEffect } from 'react';
   
const App = () => {
    const [cards, setCards] = useState([]);
    const [titles, setTitles] = useState([]);
    const [search, setSearch] = useState('');
    const [filterTitle, setFilterTitle] = useState('');
    const [darkMode, setDarkMode] = useState(false);

    const [page, setPage] = useState(1);
    const limit = 10;

    const toggleMode = () => setDarkMode(prev => !prev);

    const resetFilters = () => {
        setSearch('');
        setFilterTitle('');
    };

    const handleAddProfile = (newProfile) => {
        setCards(prev => [...prev, 
            {
                image: newProfile.image,
                title: newProfile.title,
                description: `${newProfile.title} - ${newProfile.bio}`,
            }
        ]);
    };

    useEffect(() => {
        const fetchTitles = async () => {
            try {
                const response = await fetch ("https://web.ics.purdue.edu/~zong6/profile-app/get-titles.php");
                const data = await response.json();
                setTitles(data.titles);
            } catch (error) {
                console.error("Error fetching titles: ", error);
            }
        };

        fetchTitles();
    }, []);

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const response = await fetch ("https://web.ics.purdue.edu/~zong6/profile-app/fetch-data.php");
                const data = await response.json();
                setCards(data);
            } catch (error) {
                console.error("Error fetching profiles: ", error);
            }
        };

        fetchProfiles();
    }, []);

    useEffect(() => {
        const fetchFilteredProfiles = async () => {
            try {
                const response = await fetch (`https://web.ics.purdue.edu/~zong6/profile-app/fetch-data-with-filter.php?title=${filterTitle}&name=${search}&page=${page}&limit=${limit}`);
                const data = await response.json();
                setCards(data.profiles);
            } catch (error) {
                console.error("Error fetching filtered profiles: ", error);
            }
        };

        if (filterTitle || search) {
            fetchFilteredProfiles();
        }
    }, [filterTitle, search, page]);

    return (
        <div className={darkMode ? styles.appDark : styles.appLight}>
            <Header onToggleMode={toggleMode} darkMode={darkMode} />
            <Introduction introText={getText()} />

            <Filters
                titles={titles}
                search={search}
                filterTitle={filterTitle}
                onSearchChange={setSearch}
                onFilterChange={setFilterTitle}
                onReset={resetFilters}
                darkMode={darkMode}
            />

            <ProfileForm onAddProfile={handleAddProfile} darkMode={darkMode} />

            {cards.length > 0 ? (
                <section className={styles.cardsContainer}>
                    {cards.map((card, index) => (
                        <Card 
                            key={index} 
                            image={card.image} 
                            title={card.title} 
                            description={card.description}
                        />
                    ))}
                </section> 
            ) : (
                <p className={styles.noResults}>No results found</p>
            )}
        </div>
    );
};

export default App;

