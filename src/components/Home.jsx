import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/menu/view`);
                setMenuItems(response.data);
            } catch (error) {
                console.error("Error fetching menu items:", error);
            }
        };

        fetchMenuItems();
    }, []);

    return (
        <div className="container mt-5">
            <h2 className="text-center">Our Menu</h2>
            <div className="row">
                {menuItems.map((item) => (
                    <div key={item._id} className="col-md-4 mb-4">
                        <div className="card h-100 shadow-sm border-0 transition">
                            <img src={item.imageURL} className="card-img-top" alt={item.name} />
                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <p className="card-text">Price: ${item.price}</p>
                                <p className={`badge ${item.type === "Veg" ? "bg-success" : "bg-danger"}`}>{item.type}</p>
                                <p className="badge bg-primary">{item.category}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
