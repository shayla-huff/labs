import ProfileForm from "../components/profileform.jsx";
import { useNavigate } from "react-router-dom";

const AddProfile = ({ setCards }) => {
    const navigate = useNavigate();

    const handleAddProfile = (profile) => {
        // add the new profile to the cards state
        setCards(prev => [...prev, profile]);
        // navigate back to the home page
        navigate("/");
    };

    return (
        <div>
            <h2>Add a New Profile</h2>
            <ProfileForm onAddProfile={handleAddProfile} />
        </div>
    );
};

export default AddProfile;