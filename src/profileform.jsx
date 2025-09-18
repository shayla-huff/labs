import { useState } from "react";
//import styles from './css/profileform.module.css';

const ProfileForm = ({ onAddProfile, darkMode }) => {
    // form field state
    const [formData, setFormData] = useState({
        name:"", email:"", title:"", bio:"", image:"",
    });

    //validation and feedback state
    const [errors, setError] = useState({});
    const [success, setSuccess] = useState("");

    // handles typing in fields 
    const handleChange = (e) => {
        const { name, value } = e.target;

        // update form data state
        setFormData(prev => ({ ...prev, [name]: value }));

        // validate field on change
        validateField(name, value);
    };

    // validates individual field
    const validateField = (name, value) => {
        let errorMsg = "";
        if (!value.trim()) {
            errorMsg = `${name} is required`;
        } else {
            if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
                errorMsg = "Please enter a valid email";
            }
        }

        // update errors state
        setError(prev => ({ ...prev, [name]: errorMsg }));
    };

    // validates all fields before submission
    const validateForm = () => {
        const newErrors = {};
        Object.keys(formData).forEach((field) => {
            validateField(field, formData[field]);
            if (!formData[field].trim()) {
                newErrors[field] = `${field} is required`;
            }
        });
        return newErrors;
    };

    // handles form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        setSuccess("");

        const newErrors = validateForm();
        if (Object.values(newErrors).some((msg) => msg !== "")) {
            setError(newErrors);
            return;
        }

        // if no errors, submit form
        onAddProfile({
            image: formData.image, title: formData.name, description: `${formData.title} - ${formData.bio}`,
        });

        setFormData({ name:"", email:"", title:"", bio:"", image:"" });
        setError({});
        setSuccess("Profile added successfully!");
    };

    return (
        <form onSubmit={handleSubmit} className={`profile-form ${darkMode ? "dark" : ""}`}>
            <h2>Add a New Profile</h2>

            {success && <p className="success-message">{success}</p>}

            <div>
                <label>Name:</label>
                <input name="name" value={formData.name} onChange={handleChange}onBlur={(e) => validateField("name", e.target.value)} />
                {errors.name && <span className="error">{errors.name}</span>}
            </div>

            <div>
                <label>Email:</label>
                <input name="email" value={formData.email} onChange={handleChange} onBlur={(e) => validateField("email", e.target.value)} />
                {errors.email && <span className="error">{errors.email}</span>}
            </div>
            
            <div>
                <label>Title:</label>
                <input name="title" value={formData.title} onChange={handleChange} onBlur={(e) => validateField("title", e.target.value)} />
                {errors.title && <span className="error">{errors.title}</span>}
            </div>

            <div>
                <label>Bio:</label>
                <textarea name="bio" value={formData.bio} onChange={handleChange} onBlur={(e) => validateField("bio", e.target.value)} />
                {errors.bio && <span className="error">{errors.bio}</span>}
            </div>

            <div>
                <label>Image:</label>
                <input name="image" value={formData.image} onChange={handleChange} onBlur={(e) => validateField("image", e.target.value)} />
                {errors.image && <span className="error">{errors.image}</span>}
            </div>

            <button type="submit">Add Profile</button>
        </form>
    );

};

export default ProfileForm;


