import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../store/auth";
import "./Navbar.css";

export const Navbar = () => {
    const { isLoggedIn } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <header className="navbar">
            <div className="container">
                <div className="logo-brand">
                    <NavLink to="/" className="logo">MERN</NavLink>
                </div>

                <button className={`mobile-menu-button ${isSidebarOpen ? 'open' : ''}`} onClick={toggleSidebar}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <nav className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                    <ul className="nav-links">
                        <li>
                            <NavLink 
                                to="/" 
                                className={({ isActive }) => isActive ? "active" : ""}
                                onClick={toggleSidebar}
                                end
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/about" 
                                className={({ isActive }) => isActive ? "active" : ""}
                                onClick={toggleSidebar}
                            >
                                About
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/services" 
                                className={({ isActive }) => isActive ? "active" : ""}
                                onClick={toggleSidebar}
                            >
                                Services
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/contact" 
                                className={({ isActive }) => isActive ? "active" : ""}
                                onClick={toggleSidebar}
                            >
                                Contact
                            </NavLink>
                        </li>
                        {isLoggedIn ? (
                            <li>
                                <NavLink 
                                    to="/logout" 
                                    className={({ isActive }) => isActive ? "active" : ""}
                                    onClick={toggleSidebar}
                                >
                                    Logout
                                </NavLink>
                            </li>
                        ) : (
                            <>
                                <li>
                                    <NavLink 
                                        to="/login" 
                                        className={({ isActive }) => isActive ? "active" : ""}
                                        onClick={toggleSidebar}
                                    >
                                        Login
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink 
                                        to="/register" 
                                        className={({ isActive }) => isActive ? "active" : ""}
                                        onClick={toggleSidebar}
                                    >
                                        Register
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
};
