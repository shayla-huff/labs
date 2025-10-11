import { useState, useRef, useLayoutEffect, useContext, useCallback } from "react";
import { ProfilesContext } from '../contexts/ProfilesContext';
import styles from '../css/profiles.module.css';

const ProfilesForm = ({ darkMode }) => {
    const { addProfiles } = useContext(ProfilesContext);
    const [formData, setFormData] = useState({
        name: "", email: "", title: "", bio: "", image: "",
    });
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState("");

    // useRef to focus the name input when form loads
    const nameInputRef = useRef(null);

    // useRef + useLayoutEffect to measure form width
    const formRef = useRef(null);
    const [formWidth, setFormWidth] = useState(0);

    useLayoutEffect(() => {
        if (nameInputRef.current) nameInputRef.current.focus();
        if (formRef.current) setFormWidth(formRef.current.offsetWidth);
    }, []);

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        validateField(name, value);
    }, []);

    const validateField = useCallback((name, value) => {
        let errorMsg = "";
        if (!value.trim()) errorMsg = `${name} is required`;
        else if (name === "email" && !/\S+@\S+\.\S+/.test(value)) errorMsg = "Please enter a valid email";
        setErrors(prev => ({ ...prev, [name]: errorMsg }));
    }, []);

    // const validateForm = () => {
    //     const newErrors = {};
    //     Object.keys(formData).forEach(field => {
    //         if (!formData[field].trim()) newErrors[field] = `${field} is required`;  
    //     });
    //     return newErrors;
    // };

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        const newErrors = {};
        Object.keys(formData).forEach(field => {
            if (!formData[field].trim()) newErrors[field] = `${field} is required`;
        });
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        addProfiles([formData]); // Add to context

        setFormData({ name: "", email: "", title: "", bio: "", image: "" });
        setErrors({});
        setSuccess("Profile added successfully!");
    }, [formData, addProfiles]);

    return (
        <form 
            ref={formRef}
            onSubmit={handleSubmit} 
            className={`${styles.profilesForm} ${darkMode ? styles["profilesForm--dark"] : ""}`}
        >
            <h2 className={styles.profilesForm__heading}>Add a New Profile</h2>
            {success && <p className={styles.profilesForm__successMessage}>{success}</p>}

            {["name","email","title","bio","image"].map(field => (
                <div key={field} className={styles.profilesForm__field}>
                    <label className={styles.profilesForm__label}>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
                    {field === "bio" ? (
                        <textarea
                            className={styles.profilesForm__textarea}
                            name={field}
                            value={formData[field]}
                            onChange={handleChange}
                            onBlur={(e) => validateField(field, e.target.value)}
                        />
                    ) : (
                        <input
                            ref={field === "name" ? nameInputRef : null}
                            className={styles.profilesForm__input}
                            name={field}
                            value={formData[field]}
                            onChange={handleChange}
                            onBlur={(e) => validateField(field, e.target.value)}
                        />
                    )}
                    {errors[field] && <span className={styles.profilesForm__errorMessage}>{errors[field]}</span>}
                </div>
            ))}

            <button type="submit" className={styles.profilesForm__button}>
                Add Profile
            </button>
        </form>
    );
};

export default ProfilesForm;



