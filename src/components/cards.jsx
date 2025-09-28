import styles from '../css/card.module.css';

const Card = ({ image, title, description }) => (
    <div className={styles.card}>
        <img src={image} alt={title} className={styles.cardImage} />
        <h2>{title}</h2>
        <p>{description}</p>
    </div>
);

const Cards = ({ cards }) => {
    return (
        <div>
            {cards.length === 0 ? (
                <p>No profiles found.</p>
            ) : (
                cards.map((card, index) => (
                    <Card
                        key={index}
                        image={card.image}
                        title={card.title}
                        description={card.description}
                    />
                ))
            )}
        </div>
    );
};

export default Cards;