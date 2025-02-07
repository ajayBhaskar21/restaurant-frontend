import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const UpdateMenuItem = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [menuItem, setMenuItem] = useState({
        name: "",
        price: "",
        imageURL: "",
        type: "Veg",
        category: "Tiffin",
    });

    const categories = ["Tiffin", "Starter", "Biryani", "Fried Rice", "Curry", "Drink", "Ice Cream", "Cake", "Dessert", "Meals"];

    useEffect(() => {
        const fetchMenuItem = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/menu/update/${id}`);
                setMenuItem(response.data);
            } catch (error) {
                console.error("Error fetching menu item:", error);
            }
        };
        fetchMenuItem();
    }, [id]);

    const handleChange = (e) => {
        setMenuItem({ ...menuItem, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/menu/update/${id}`, menuItem);
            alert("Menu item updated successfully!");
            navigate("/admin/viewMenuItems");
        } catch (error) {
            console.error("Error updating menu item:", error);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Update Menu Item</h2>
            <form onSubmit={handleSubmit} className="w-50 mx-auto">
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" name="name" value={menuItem.name} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Price</label>
                    <input type="number" className="form-control" name="price" value={menuItem.price} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Image URL</label>
                    <input type="text" className="form-control" name="imageURL" value={menuItem.imageURL} onChange={handleChange} required />
                </div>

                {/* Veg / Non-Veg Radio Buttons */}
                <div className="mb-3">
                    <label className="form-label">Type</label><br />
                    <div className="form-check form-check-inline">
                        <input type="radio" className="form-check-input" name="type" value="Veg" checked={menuItem.type === "Veg"} onChange={handleChange} />
                        <label className="form-check-label">Veg</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input type="radio" className="form-check-input" name="type" value="Non-Veg" checked={menuItem.type === "Non-Veg"} onChange={handleChange} />
                        <label className="form-check-label">Non-Veg</label>
                    </div>
                </div>

                {/* Category Dropdown */}
                <div className="mb-3">
                    <label className="form-label">Category</label>
                    <select className="form-select" name="category" value={menuItem.category} onChange={handleChange}>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="btn btn-primary w-100">Update Item</button>
            </form>
        </div>
    );
};

export default UpdateMenuItem;
