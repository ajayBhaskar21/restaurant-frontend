import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const isAuthenticated = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/">Restaurant</Link>
                <div>
                    <Link className="btn btn-light me-2" to="/">Home</Link>
                    {isAuthenticated ? (
                        <>
                            <Link className="btn btn-primary me-2" to="/admin/addMenuItem">Add Menu</Link>
                            <Link className="btn btn-secondary me-2" to="/admin/viewMenuItems">View Menu</Link>
                            <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                        </>
                    ) : (
                        <Link className="btn btn-success" to="/login">Admin Login</Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
