import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProfilesById } from "./fetchdata.jsx";
import styles from "../css/profiles.module.css";

const ProfilesDetails = () => {
    const { id } = useParams();
    const [profiles, setProfiles] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const response = await fetch(`https://web.ics.purdue.edu/~zong6/profile-app/fetch-data-with-id.php?id=${id}`);
                if (!response.ok) throw new Error("Failed to fetch profile");

                const data = await response.json();
                setProfiles(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProfiles();
    }, [id]);

    useEffect(() => {
        const getProfiles = async () => setProfiles(await fetchProfilesById(id));
        getProfiles();
    }, [id]);
    
    if (loading) return <div>Loading...</div>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;
    if (!profiles) return <p>No profile found</p>;

    return (
        <div className={styles.profilesCard}>
            <h2>{profiles.name}</h2>
            <p><strong>Email:</strong> {profiles.email}</p>
            <p><strong>Title:</strong> {profiles.title}</p>
            <p><strong>Bio:</strong> {profiles.bio}</p>
        </div>
    );
};

export default ProfilesDetails;

