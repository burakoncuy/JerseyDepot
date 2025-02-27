import { useState } from "react";
import { useDispatch } from "react-redux";
import { createItem } from "../../redux/items";
import { useNavigate } from "react-router-dom";
import './ItemCreate.css'; // Importing the CSS file for styles

const ItemCreate = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        category: "SOCCER",
        condition: "NEW",
        image_url: "",
        size: "M",
        item_status: "AVAILABLE"
    });

    const [errors, setErrors] = useState({
        name: "",
        description: "",
        price: "",
        image_url: ""
    });

    const categories = ["SOCCER", "FOOTBALL", "BASKETBALL", "BASEBALL"];
    const conditions = ["NEW", "USED"];
    const sizes = ["S", "M", "L", "XL"];
    // const statuses = ["AVAILABLE", "SOLD"];
    const statuses = ["AVAILABLE"];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        const newErrors = {};

        // Name Validation
        if (!formData.name) {
            newErrors.name = "Name is required.";
        } else if (!isNaN(formData.name)) {
            newErrors.name = "Name should be a valid string, not a number.";
        } 

        // Description Validation
        if (formData.description.length < 5) {
            newErrors.description = "Description must be at least 5 characters.";
        } else if (!isNaN(formData.description)) {
            newErrors.description = "Description should be a valid string, not a number.";
        }
            // Price Validation
        if (formData.price <= 0 || isNaN(formData.price))
        newErrors.price = "Price must be a valid number greater than 0.";

        // Image URL Validation
        const urlPattern = /^(https?:\/\/[^\s$.?#].[^\s]*$)/;
        if (!urlPattern.test(formData.image_url))
        newErrors.image_url = "Please enter a valid URL.";

        setErrors(newErrors);

        // Return true if no errors, else false
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            await dispatch(createItem(formData));
            navigate("/items");
        }
    };

    return (
        <div className="item-create__container">
            <h2 className="item-create__heading">Create New Item</h2>
            <form onSubmit={handleSubmit} className="item-create__form">
                <input 
                    type="text" 
                    name="name" 
                    placeholder="Name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    className="item-create__input" 
                    required 
                />
                {errors.name && <p className="error">{errors.name}</p>}
                <textarea 
                    name="description" 
                    placeholder="Description" 
                    value={formData.description} 
                    onChange={handleChange} 
                    className="item-create__textarea"
                    required
                ></textarea>
                {errors.description && <p className="error">{errors.description}</p>}
                <input 
                    type="number" 
                    name="price" 
                    placeholder="Price" 
                    value={formData.price} 
                    onChange={handleChange} 
                    className="item-create__input" 
                    required 
                />
                {errors.price && <p className="error">{errors.price}</p>}
                <input 
                    type="text" 
                    name="image_url" 
                    placeholder="Image URL" 
                    value={formData.image_url} 
                    onChange={handleChange} 
                    className="item-create__input" 
                    required 
                />
                {errors.image_url && <p className="error">{errors.image_url}</p>}
                <select 
                    name="category" 
                    value={formData.category} 
                    onChange={handleChange} 
                    className="item-create__select"
                >
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
                <select 
                    name="condition" 
                    value={formData.condition} 
                    onChange={handleChange} 
                    className="item-create__select"
                >
                    {conditions.map(cond => <option key={cond} value={cond}>{cond}</option>)}
                </select>
                <select 
                    name="size" 
                    value={formData.size} 
                    onChange={handleChange} 
                    className="item-create__select"
                >
                    {sizes.map(size => <option key={size} value={size}>{size}</option>)}
                </select>
                <select 
                    name="item_status" 
                    value={formData.item_status} 
                    onChange={handleChange} 
                    className="item-create__select"
                >
                    {statuses.map(status => <option key={status} value={status}>{status}</option>)}
                </select>
                <button type="submit" className="item-create__button">Create Item</button>
            </form>
        </div>
    );
};

export default ItemCreate;
