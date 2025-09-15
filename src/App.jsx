import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './css/App.css'
import Header from './header.jsx';
import Introduction, { getText } from './intro.jsx';
import Card from './cards.jsx';
import Filters from './filters.jsx'
   
const App = () => {
    const cards = [
        {
            image: "https://media.licdn.com/dms/image/v2/D4E03AQGYxXdMqX9q_A/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1721353888105?e=1759968000&v=beta&t=TNr6xOrpWnj30DyEKxW9xT66k0C7yACize-JoztNbIg",
            title: "Shayla Hufford",
            description: "Web Development Student",
        },
        {
            image: "https://pyxis.nymag.com/v1/imgs/b84/54b/2675886b08f1ec3f52bb31bf7e0fea6f19-17-drew-barrymore.2x.rhorizontal.w700.jpg",
            title: "Drew Barrymore",
            description: "Actress",
        },
    ];

    const [search, setSearch] = useState('');
    const [filterTitle, setFilterTitle] = useState('');

    const titles = [...new Set(cards.map(card => card.title))];

    const filteredCards = cards.filter(card => {
        const matchesSearch = card.title.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filterTitle ? card.title === filterTitle : true; 
        return matchesSearch && matchesFilter;
    });

    const resetFilters = () => {
        setSearch('');
        setFilterTitle('');
    };

    return (
        <div className="App">
            <Header />
            <Introduction introText={getText()} />

            <Filters
                titles={titles}
                search={search}
                filterTitle={filterTitle}
                onSearchChange={setSearch}
                onFilterChange={setFilterTitle}
                onReset={resetFilters}
            />

            <section className="cards-container">
                {filteredCards.map((card, index) => (
                    <Card key={index} image={card.image} title={card.title} description={card.description} />
                ))}
            </section>
        </div>
    );

    return (
        <div className={darkMode ? styles.appDark : styles.appLight}>
            <Header onToggleMode={toggleMode} darkMode={darkMode} />
            <Introduction introText={getText()} />
            {filteredCards.length > 0 ? (
                <section className={styles.cardsContainer}>
                    {filteredCards.map((card, index) => (
                        <Card key={index} image={card.image} title={card.title} description={card.description} />
                    ))}
                </section> 
            ) : (
                <p>No results found</p>
            )}
        </div>
    )
};

export default App;

