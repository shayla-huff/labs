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
        if (!value.trim()) {
            errorMsg = `${name} is required`;
        } else if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
            errorMsg = "Please enter a valid email";
        }
        setErrors(prev => ({ ...prev, [name]: errorMsg }));
    };

    const validateForm = () => {
        const newErrors = {};
        Object.keys(formData).forEach((field) => {
            if (!formData[field].trim()) {
                newErrors[field] = `${field} is required`;
            }
        });
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSuccess("");

        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        onAddProfile({
            image: formData.image,
            title: formData.name,
            description: `${formData.title} - ${formData.bio}`,
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

            <div className={styles.profileForm__field}>
                <label className={styles.profileForm__label}>Name:</label>
                <input 
                    className={styles.profileForm__input} 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange}
                    onBlur={(e) => validateField("name", e.target.value)}
                />
                {errors.name && <span className={styles.profileForm__errorMessage}>{errors.name}</span>}
            </div>

            <div className={styles.profileForm__field}>
                <label className={styles.profileForm__label}>Email:</label>
                <input 
                    className={styles.profileForm__input} 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    onBlur={(e) => validateField("email", e.target.value)} 
                />
                {errors.email && <span className={styles.profileForm__errorMessage}>{errors.email}</span>}
            </div>
            
            <div className={styles.profileForm__field}>
                <label className={styles.profileForm__label}>Title:</label>
                <input 
                    className={styles.profileForm__input}
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    onBlur={(e) => validateField("title", e.target.value)}
                />
                {errors.title && <span className={styles.profileForm__errorMessage}>{errors.title}</span>}
            </div>

            <div className={styles.profileForm__field}>
                <label className={styles.profileForm__label}>Bio:</label>
                <textarea 
                    className={styles.profileForm__textarea}
                    name="bio" 
                    value={formData.bio} 
                    onChange={handleChange} 
                    onBlur={(e) => validateField("bio", e.target.value)}
                />
                {errors.bio && <span className={styles.profileForm__errorMessage}>{errors.bio}</span>}
            </div>

            <div className={styles.profileForm__field}>
                <label className={styles.profileForm__label}>Image:</label>
                <input 
                    className={styles.profileForm__input}
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    onBlur={(e) => validateField("image", e.target.value)}
                />
                {errors.image && <span className={styles.profileForm__errorMessage}>{errors.image}</span>}
            </div>

            <button type="submit" className={styles.profileForm__button}>
                Add Profile
            </button>
        </form>
    );
};

export default ProfileForm;



