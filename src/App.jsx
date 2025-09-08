import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const Header = () => (
    <header className="header">
        <nav>
            <ul className="navbar">
                <li>Home</li>
                <li>About</li>
                <li>Profiles</li>
            </ul>
        </nav>
    </header>
);

const Introduction = ({ introText }) => (
    <section className="introduction">
        <p>{introText}</p>
    </section>
)

const Card = ({ image, title, description }) => (
    <div className="card">
        <img src={image} alt={title} className="card-image" />
        <h2>{title}</h2>
        <p>{description}</p>
    </div>
);

const getText = () => {
    return "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
};
   
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

    return (
        <div className="App">
            <Header />
            <Introduction introText={getText()} />
            <section className="cards-container">
                {cards.map((card, index) => (
                    <Card key={index} image={card.image} title={card.title} description={card.description} />
                ))}
            </section>
        </div>
    );
};

export default App;

