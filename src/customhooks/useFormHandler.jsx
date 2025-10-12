import { useState, useCallback } from "react";

export const useFormHandler = (initialState, oneSubmitCallback) => {
    const [formData, setFormData] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState("");

    const validateField = useCallback((name, value) => {
        let errorMsg = "";
        if (!value.trim()) errorMsg = `${name} is required`;
        else if (name === "email" && !/\S+@\S+\.\S+/.test(value))
            errorMsg = "Please enter a valid email";
        setErrors(prev => ({...prev, [name]: errorMsg }));
    }, []);

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prev => ({...prev, [name]: value }));
        validateField(name, value);
    }, [validateField]);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();

        const newErrors = {};
        Object.keys(formdata).forEach(field => {
            if (!formData[field].trim()) newErrors[field] = `${field} is required`;
        });
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        onSubmitCallnack([formData]);
        setSuccess("Profile added successfully!");
        setFormData(initialState);
        setErrors({});
    }, [formData, initialState, oneSubmitCallback]);
    
    return { formData, errors, success, handleChange, handleSubmit, validateField };
};