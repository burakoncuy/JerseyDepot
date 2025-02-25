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

    const categories = ["SOCCER", "FOOTBALL", "BASKETBALL", "BASEBALL"];
    const conditions = ["NEW", "USED"];
    const sizes = ["S", "M", "L", "XL", "XXL"];
    const statuses = ["AVAILABLE", "SOLD"];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(createItem(formData));
        navigate("/items");
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
                <textarea 
                    name="description" 
                    placeholder="Description" 
                    value={formData.description} 
                    onChange={handleChange} 
                    className="item-create__textarea"
                    required
                ></textarea>
                <input 
                    type="number" 
                    name="price" 
                    placeholder="Price" 
                    value={formData.price} 
                    onChange={handleChange} 
                    className="item-create__input" 
                    required 
                />
                <input 
                    type="text" 
                    name="image_url" 
                    placeholder="Image URL" 
                    value={formData.image_url} 
                    onChange={handleChange} 
                    className="item-create__input" 
                    required 
                />
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
