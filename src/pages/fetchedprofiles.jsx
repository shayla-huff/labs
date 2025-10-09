import { useEffect, useState, useRef, useLayoutEffect } from "react";
import { Link, Outlet } from "react-router-dom"; 
import { ProfilesContext } from '../contexts/ProfilesContext';
import { fetchAllProfiles } from "../components/FetchData.jsx";
import styles from "../css/profiles.module.css";

const FetchedProfiles = () => {
    const { profiles, addProfiles } = useContext(ProfilesContext);
    const listRef = useRef(null);
    const [gridWidth, setGridWidth] = useState(0);

    useLayoutEffect(() => {
        if (listRef.current) {
            setGridWidth(listRef.current.offsetWidth);
        }
    }, []);

    useEffect(() => {
        const getProfiles = async () => {
            try {
                const data = await fetchAllProfiles();
                addProfiles(data);
            } catch (err) {
                console.error(err);
            } 
        };
        getProfiles();
    }, [addProfiles]);

    return (
        <div className={styles.profilesList}>
            <h2 className={styles.profilesForm__heading}>Fetched Profiles</h2>
            <div ref={gridRef} className={styles.profilesGrid}>
                {profiles.map((profiles) => (
                    <div key={profiles.id} className={styles.profilesCard}>
                        <img 
                            src={profiles.image} 
                            alt={profiles.title} 
                            className={styles.profilesImage}
                        />
                        <h3 className={styles.profilesTitle}>{profiles.title}</h3>
                        <p className={styles.profilesDescription}>{profiles.description}</p>

                        <Link to={`profiles/${profiles.id}`}>View Details</Link>
                    </div>
                ))}
            </div>
            <Outlet />
        </div>
    );
};

export default FetchedProfiles;
