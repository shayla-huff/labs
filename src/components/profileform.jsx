import { useState } from "react";
import styles from '../css/profile.module.css';

const ProfileForm = ({ onAddProfile, darkMode }) => {
    const [formData, setFormData] = useState({
        name: "", email: "", title: "", bio: "", image: "",
    });
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        validateField(name, value);
    };

    const validateField = (name, value) => {
        let errorMsg = "";
        if (!value.trim()) errorMsg = `${name} is required`;
        else if (name === "email" && !/\S+@\S+\.\S+/.test(value)) errorMsg = "Please enter a valid email";
        setErrors(prev => ({ ...prev, [name]: errorMsg }));
    };

    const validateForm = () => {
        const newErrors = {};
        Object.keys(formData).forEach(field => {
            if (!formData[field].trim()) newErrors[field] = `${field} is required`;  
        });
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        onAddProfile({
            name: formData.name,
            email: formData.email,
            title: formData.title,
            bio: formData.bio,
            image: formData.image,
        });

        setFormData({ name: "", email: "", title: "", bio: "", image: "" });
        setErrors({});
        setSuccess("Profile added successfully!");
    };

    return (
        <form 
            onSubmit={handleSubmit} 
            className={`${styles.profileForm} ${darkMode ? styles["profileForm--dark"] : ""}`}
        >
            <h2 className={styles.profileForm__heading}>Add a New Profile</h2>
            {success && <p className={styles.profileForm__successMessage}>{success}</p>}

            {["name","email","title","bio","image"].map(field => (
                <div key={field} className={styles.profileForm__field}>
                    <label className={styles.profileForm__label}>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
                    {field === "bio" ? (
                        <textarea
                            className={styles.profileForm__textarea}
                            name={field}
                            value={formData[field]}
                            onChange={handleChange}
                            onBlur={(e) => validateField(field, e.target.value)}
                        />
                    ) : (
                        <input
                            className={styles.profileForm__input}
                            name={field}
                            value={formData[field]}
                            onChange={handleChange}
                            onBlur={(e) => validateField(field, e.target.value)}
                        />
                    )}
                    {errors[field] && <span className={styles.profileForm__errorMessage}>{errors[field]}</span>}
                </div>
            ))}

            <button type="submit" className={styles.profileForm__button}>
                Add Profile
            </button>
        </form>
    );
};

export default ProfileForm;



