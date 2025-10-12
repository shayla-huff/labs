import { useState, useRef, useLayoutEffect, useContext, useCallback } from "react";
import { ProfilesContext } from '../contexts/ProfilesContext';
import { useFormHandler } from "../customhooks/useFormHandler"
import styles from '../css/profiles.module.css';

const ProfilesForm = ({ darkMode }) => {
    const { addProfiles } = useContext(ProfilesContext);
    const nameInputRef = useRef(null);
    const formRef = useRef(null);

    const { 
        formData, 
        errors, 
        success, 
        handleChange, 
        handleSubmit, 
        validateField 
    } = useFormHandler(
        { name: "", email: "", title: "", bio: "", image: "" },
        addProfiles
    );

    useLayoutEffect(() => {
        if (nameInputRef.current) nameInputRef.current.focus();
    }, []);

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



