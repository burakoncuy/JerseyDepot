import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { deleteItem, getItem } from "../../redux/items";

const ItemDelete = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const item = useSelector(state => state.items.currentItem); // Access currentItem
    const notFound = useSelector(state => state.items.notFound); // Access notFound state
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch the item when the component mounts
    useEffect(() => {
        dispatch(getItem(id))
            .then(() => setLoading(false))
            .catch((err) => {
                console.error("Error fetching item:", err);
                setError("Failed to fetch item");
                setLoading(false);
            });
    }, [dispatch, id]);

    // Handle the case where the item is not found
    useEffect(() => {
        if (!loading && notFound) {
            setError("Item not found");
        }
    }, [loading, notFound]);

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            await dispatch(deleteItem(id));
            navigate("/items");
        }
    };

    if (loading) return <h2>Loading...</h2>;
    if (error) return <h2>{error}</h2>;

    return (
        <div>
            <h2>Delete Item</h2>
            <p>Are you sure you want to delete the item: <strong>{item?.name}</strong>?</p>
            <button onClick={handleDelete}>Yes, Delete</button>
            <button onClick={() => navigate("/items")}>Cancel</button>
        </div>
    );
};

export default ItemDelete;