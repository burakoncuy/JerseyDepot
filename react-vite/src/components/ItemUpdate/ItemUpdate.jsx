import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { updateItem, getItem } from "../../redux/items";
import './ItemUpdate.css';

const ItemUpdate = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const item = useSelector(state => state.items.item);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        category: "SOCCER",
        condition: "NEW",
        image: null, // File input (new image)
        size: "M",
        item_status: "AVAILABLE",
        existingImage: "" // Existing image URL
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        dispatch(getItem(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (item) {
            setFormData({
                name: item.name,
                description: item.description,
                price: item.price,
                category: item.category,
                condition: item.condition,
                size: item.size,
                item_status: item.item_status,
                existingImage: item.image_url // Keep existing image
            });
        }
    }, [item]);

    const categories = ["SOCCER", "FOOTBALL", "BASKETBALL", "BASEBALL"];
    const conditions = ["NEW", "USED"];
    const sizes = ["S", "M", "L", "XL"];
    const statuses = ["AVAILABLE", "SOLD"];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, image: file }); // Store new image
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name) newErrors.name = "Name is required.";
        if (!isNaN(formData.name)) newErrors.name = "Name should be a valid string.";

        if (formData.description.length < 5) newErrors.description = "Description must be at least 5 characters.";
        if (!isNaN(formData.description)) newErrors.description = "Description should be a valid string.";

        if (formData.price <= 0 || isNaN(formData.price)) newErrors.price = "Price must be a valid number greater than 0.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            const formDataToSend = new FormData();
            formDataToSend.append("name", formData.name);
            formDataToSend.append("description", formData.description);
            formDataToSend.append("price", formData.price);
            formDataToSend.append("category", formData.category);
            formDataToSend.append("condition", formData.condition);
            formDataToSend.append("size", formData.size);
            formDataToSend.append("item_status", formData.item_status);
    
            if (formData.image) {
                formDataToSend.append("image", formData.image); // Append new image if changed
            }
    
            // Debugging: Check the FormData being sent
            for (let pair of formDataToSend.entries()) {
                console.log(pair[0], pair[1]);
            }
    
            await dispatch(updateItem(id, formDataToSend));
            navigate("/items");
        }
    };

    if (!item) {
        return <div className="item-update__loading-message">No item to update.</div>;
    }

    return (
        <div className="item-update__container">
            <h2 className="item-update__heading">Update Item</h2>
            <form onSubmit={handleSubmit} className="item-update__form" encType="multipart/form-data">
                <input 
                    type="text" 
                    name="name" 
                    placeholder="Name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    className="item-update__input" 
                    required 
                />
                {errors.name && <p className="error">{errors.name}</p>}

                <textarea 
                    name="description" 
                    placeholder="Description" 
                    value={formData.description} 
                    onChange={handleChange} 
                    className="item-update__textarea"
                ></textarea>
                {errors.description && <p className="error">{errors.description}</p>}

                <input 
                    type="number" 
                    name="price" 
                    placeholder="Price" 
                    value={formData.price} 
                    onChange={handleChange} 
                    className="item-update__input" 
                    required 
                />
                {errors.price && <p className="error">{errors.price}</p>}

                <input 
                    type="file" 
                    name="image" 
                    onChange={handleFileChange} 
                    className="item-update__input"
                />
                {formData.existingImage && (
                    <div className="item-update__existing-image">
                        <p>Current Image:</p>
                        <img src={formData.existingImage} alt="Existing Item" width="100px" />
                    </div>
                )}
                {errors.image && <p className="error">{errors.image}</p>}

                <select name="category" value={formData.category} onChange={handleChange} className="item-update__select">
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>

                <select name="condition" value={formData.condition} onChange={handleChange} className="item-update__select">
                    {conditions.map(cond => <option key={cond} value={cond}>{cond}</option>)}
                </select>

                <select name="size" value={formData.size} onChange={handleChange} className="item-update__select">
                    {sizes.map(size => <option key={size} value={size}>{size}</option>)}
                </select>

                <select name="item_status" value={formData.item_status} onChange={handleChange} className="item-update__select">
                    {statuses.map(status => <option key={status} value={status}>{status}</option>)}
                </select>

                <button type="submit" className="item-update__button">Update Item</button>
            </form>
        </div>
    );
};

export default ItemUpdate;
