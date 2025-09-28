import ProfileForm from "../components/profileform.jsx";

const AddProfile = ({ setCards }) => {
    const handleAddProfile = (profile) => {
        setCards(prev => [...prev, profile]);
    };

    return (
        <div>
            <h2>Add a New Profile</h2>
            <ProfileForm onAddProfile={handleAddProfile} />
        </div>
    );
};

export default AddProfile;