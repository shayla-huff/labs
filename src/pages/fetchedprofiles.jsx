import { useEffect, useState, useRef, useLayoutEffect, useContext, lazy, Suspense } from "react";
import { Link, Outlet } from "react-router-dom"; 
import { ProfilesContext } from '../contexts/ProfilesContext';
import { fetchAllProfiles } from "../components/FetchData";
import ProfilesCard from "../components/ProfilesCard";
import styles from "../css/profiles.module.css";

const ProfilesCard = lazy(() => import("../components/ProfilesCard"));

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
                console.error("Error fetching profiles:", err);
            } 
        };
        getProfiles();
    }, [addProfiles]);

    return (
        <div className={styles.profilesList}>
            <h2 className={styles.profilesForm__heading}>Fetched Profiles</h2>

            <Suspense fallback={<div>Loading profiles...</div>}>
                <div ref={listRef} className={styles.profilesGrid}>
                    {profiles.map((profile) => (
                        <ProfilesCard key={profile.id} profile={profile} />
                    ))}
                </div>
            </Suspense>
        </div>
    );
};

export default FetchedProfiles;
