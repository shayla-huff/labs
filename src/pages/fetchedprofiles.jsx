import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom"; 
import styles from "../css/profile.module.css";

const FetchedProfiles = () => {
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const response = await fetch("https://web.ics.purdue.edu/~zong6/profile-app/fetch-data.php");
                if (!response.ok) throw new Error("Failed to fetch profiles");

                const data = await response.json();

                const mappedProfiles = data.map((user) => ({
                    id: user.id,
                    name: user.name,
                    description: user.email,
                    image: user.image || "https://via.placeholder.com/150",
                }));

                setProfiles(mappedProfiles);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProfiles();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div className={styles.profileList}>
            <h2 className={styles.profileForm__heading}>Fetched Profiles</h2>
            <div className={styles.profileGrid}>
                {profiles.map((profile) => (
                    <div key={profile.id} className={styles.profileCard}>
                        <img 
                            src={profile.image} 
                            alt={profile.title} 
                            className={styles.profileImage}
                        />
                        <h3 className={styles.profileTitle}>{profile.title}</h3>
                        <p className={styles.profileDescription}>{profile.description}</p>

                        <Link to={`profile/${profile.id}`}>View Details</Link>
                    </div>
                ))}
            </div>
            <Outlet />
        </div>
    );
};

export default FetchedProfiles;
