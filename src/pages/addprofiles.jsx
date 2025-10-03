import ProfilesForm from "../components/profilesform.jsx";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ProfileContext } from "../contexts/profilescontext.jsx";

const AddProfiles = () => {
    const { addProfiles } = useContext(ProfilesContext);
    const navigate = useNavigate();

    const handleAddProfiles = (profiles) => {
        addProfiles(profiles);
        // navigate back to the home page
        navigate("/");
    };

    return (
        <div>
            <h2>Add a New Profile</h2>
            <ProfilesForm onAddProfiles={handleAddProfiles} />
        </div>
    );
};

export default AddProfiles;