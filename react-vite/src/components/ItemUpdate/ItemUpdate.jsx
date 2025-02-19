import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { updateItem, getItem } from "../../redux/items";

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
    const sizes = ["S", "M", "L", "XL", "XXL"];
    const statuses = ["AVAILABLE", "SOLD"];
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(updateItem(id, formData));
        navigate("/items");
    };

    if (!item) {
        return <div>No item to update.</div>;
    }

    return (
        <div>
            <h2>Update Item</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
                <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange}></textarea>
                <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
                <input type="text" name="image_url" placeholder="Image URL" value={formData.image_url} onChange={handleChange} required />
                <select name="category" value={formData.category} onChange={handleChange}>
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
                <select name="condition" value={formData.condition} onChange={handleChange}>
                    {conditions.map(cond => <option key={cond} value={cond}>{cond}</option>)}
                </select>
                <select name="size" value={formData.size} onChange={handleChange}>
                    {sizes.map(size => <option key={size} value={size}>{size}</option>)}
                </select>
                <select name="item_status" value={formData.item_status} onChange={handleChange}>
                    {statuses.map(status => <option key={status} value={status}>{status}</option>)}
                </select>
                <button type="submit">Update Item</button>
            </form>
        </div>
    );
};

export default ItemUpdate;