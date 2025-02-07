import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import AddMenuItem from "./components/AddMenuItem";
import ViewMenu from "./components/ViewMenu";
import UpdateMenuItem from "./components/UpdateMenuItem";
import Login from "./components/Login";
import Navbar from "./components/NavBar";

const PrivateRoute = ({ element }) => {
    const isAuthenticated = localStorage.getItem("token");
    return isAuthenticated ? element : <Navigate to="/login" />;
};

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin/addMenuItem" element={<PrivateRoute element={<AddMenuItem />} />} />
                <Route path="/admin/viewMenuItems" element={<PrivateRoute element={<ViewMenu />} />} />
                <Route path="/admin/updateMenuItem/:id" element={<PrivateRoute element={<UpdateMenuItem />} />} />
            </Routes>
        </Router>
    );
};

export default App;
