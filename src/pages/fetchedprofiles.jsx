import { useEffect, useState, useRef, useLayoutEffect, useContext, lazy, Suspense } from "react";
import { Outlet } from "react-router-dom"; 
import { ProfilesContext } from '../contexts/ProfilesContext';
import { fetchAllProfiles } from "../components/FetchData";
import { useFetchData } from "../customhooks/useFetchData"
import styles from "../css/profiles.module.css";

const ProfilesCard = lazy(() => import("../components/ProfilesCard"));

const FetchedProfiles = () => {
    const { addProfiles } = useContext(ProfilesContext);
    const { data: profiles, loading, error } = useFetchData(fetchAllProfiles);
    const listRef = useRef(null);
    const [gridWidth, setGridWidth] = useState(0);

    useLayoutEffect(() => {
        if (listRef.current) {
            setGridWidth(listRef.current.offsetWidth);
        }
    }, []);

    useEffect(() => {
            if (profiles && profiles.length > 0) {
                addProfiles(profiles);
            }
            
    }, [profiles, addProfiles]);

    return (
        <div className={styles.profilesList}>
            <h2 className={styles.profilesForm__heading}>Fetched Profiles</h2>

            {loading && <p>Loading Profiles...</p>}
            {error && <p className={styles.profilesForm_errorMessage}>Error: {error}</p>}

            <Suspense fallback={<div>Loading profiles...</div>}>
                <div ref={listRef} className={styles.profilesGrid}>
                    {profiles && profiles.map((profile) => (
                        <ProfilesCard key={profile.id} profile={profile} />
                    ))}
                </div>
            </Suspense>

            <Outlet />
        </div>
    );
};

export default FetchedProfiles;
