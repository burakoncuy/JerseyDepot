import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { deleteItem, getItem } from "../../redux/items";
import './ItemDelete.css'; // Import the CSS file for styles

const ItemDelete = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const item = useSelector(state => state.items.item); // Corrected: Use `item` instead of `currentItem`
    const notFound = useSelector(state => state.items.notFound); // Corrected: Use `notFound`
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        dispatch(getItem(id))
            .then(() => setLoading(false))
            .catch((err) => {
                console.error("Error fetching item:", err);
                setError("Failed to fetch item");
                setLoading(false);
            });
    }, [dispatch, id]);

    useEffect(() => {
        if (!loading && notFound) {
            setError("Item not found");
        }
    }, [loading, notFound]);

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            try {
                const result = await dispatch(deleteItem(id)); // Dispatch delete action
                console.log("Delete result:", result); // Debugging
                navigate("/items/current"); // Redirect after successful deletion
            } catch (err) {
                console.error("Failed to delete item:", err); // Debugging
                setError("Failed to delete item");
            }
        }
    };

    if (loading) return <h2 className="item-delete__loading">Loading...</h2>;
    if (error) return <h2 className="item-delete__error">{error}</h2>;

    return (
        <div className="item-delete__container">
            <h2 className="item-delete__heading">Delete Item</h2>
            <p className="item-delete__message">Are you sure you want to delete the item: <strong>{item?.name}</strong>?</p>
            <div className="item-delete__buttons">
                <button onClick={handleDelete} className="item-delete__confirm-button">Yes, Delete</button>
                <button onClick={() => navigate("/items")} className="item-delete__cancel-button">Cancel</button>
            </div>
        </div>
    );
};

export default ItemDelete;
