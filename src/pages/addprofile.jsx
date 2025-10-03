import ProfileForm from "../components/profileform.jsx";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ProfileContext } from "../context/profilecontext.jsx";

const AddProfile = () => {
    const { addProfile } = useContext(ProfileContext);
    const navigate = useNavigate();

    const handleAddProfile = (profile) => {
        addProfile(profile);
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