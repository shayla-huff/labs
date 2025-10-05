import ProfilesForm from "../components/ProfilesForm";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ProfilesContext } from "../contexts/ProfilesContext";

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