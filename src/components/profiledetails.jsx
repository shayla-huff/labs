import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../css/profile.module.css";

const ProfileDetails = () => {
    const { id } = useParams();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch(`https://web.ics.purdue.edu/~zong6/profile-app/fetch-data-with-id.php?id=${id}`);
                if (!response.ok) throw new Error("Failed to fetch profile");

                const data = await response.json();
                setProfile(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [id]);
    
    if (loading) return <div>Loading...</div>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;
    if (!profile) return <p>No profile found</p>;

    return (
        <div className={styles.profileCard}>
            <h2>{profile.name}</h2>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Title:</strong> {profile.title}</p>
            <p><strong>Bio:</strong> {profile.bio}</p>
        </div>
    );
};

export default ProfileDetails;

