import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom"; 
import { fetchAllProfiles } from "../components/fetchdata.jsx";
import styles from "../css/profiles.module.css";

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

    useEffect(() => {
        const getProfiles = async () => setProfiles(await fetchAllProfiles());
        getProfiles();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div className={styles.profilesList}>
            <h2 className={styles.profilesForm__heading}>Fetched Profiles</h2>
            <div className={styles.profilesGrid}>
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
