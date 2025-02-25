import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { updateItem, getItem } from "../../redux/items";
import './ItemUpdate.css'; // Importing the CSS file for styles

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
                image_url: item.image_url,
                size: item.size,
                item_status: item.item_status
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

    const validateForm = () => {
        const newErrors = {};

        // Name Validation
        if (!formData.name) newErrors.name = "Name is required.";

        // Description Validation
        if (formData.description.length < 5)
            newErrors.description = "Description must be at least 5 characters.";

        // Price Validation
        if (formData.price <= 0)
            newErrors.price = "Price must be greater than 0.";

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
            await dispatch(updateItem(id, formData));
            navigate("/items");
        }
    };

    if (!item) {
        return <div className="item-update__loading-message">No item to update.</div>;
    }

    return (
        <div className="item-update__container">
            <h2 className="item-update__heading">Update Item</h2>
            <form onSubmit={handleSubmit} className="item-update__form">
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
                    type="text" 
                    name="image_url" 
                    placeholder="Image URL" 
                    value={formData.image_url} 
                    onChange={handleChange} 
                    className="item-update__input" 
                    required 
                />
                {errors.image_url && <p className="error">{errors.image_url}</p>}
                <select 
                    name="category" 
                    value={formData.category} 
                    onChange={handleChange} 
                    className="item-update__select"
                >
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
                <select 
                    name="condition" 
                    value={formData.condition} 
                    onChange={handleChange} 
                    className="item-update__select"
                >
                    {conditions.map(cond => <option key={cond} value={cond}>{cond}</option>)}
                </select>
                <select 
                    name="size" 
                    value={formData.size} 
                    onChange={handleChange} 
                    className="item-update__select"
                >
                    {sizes.map(size => <option key={size} value={size}>{size}</option>)}
                </select>
                <select 
                    name="item_status" 
                    value={formData.item_status} 
                    onChange={handleChange} 
                    className="item-update__select"
                >
                    {statuses.map(status => <option key={status} value={status}>{status}</option>)}
                </select>
                <button type="submit" className="item-update__button">Update Item</button>
            </form>
        </div>
    );
};

export default ItemUpdate;
