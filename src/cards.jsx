import styles from './css/card.module.css';

const Card = ({ image, title, description }) => (
    <div className="card">
        <img src={image} alt={title} className={styles.cardImage} />
        <h2>{title}</h2>
        <p>{description}</p>
    </div>
);

export default Card;