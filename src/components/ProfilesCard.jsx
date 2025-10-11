import React from "react";
import { Link } from "react-router-dom";
import styles from "../css/profiles.module.css";

const ProfilesCard = React.memo(({ profile }) => {
    return (
        <div className={styles.profilesCard}>
            <img 
                src={profile.image} 
                alt={profile.title} 
                className={styles.profilesImage}
            />
            <h3 className={styles.profilesTitle}>{profile.title}</h3>
            <p className={styles.profilesDescription}>{profile.description}</p>
            <Link to={`/profiles/${profile.id}`}>View Details</Link>
        </div>
    );
});

export default ProfilesCard;