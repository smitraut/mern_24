import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, Navigate } from "react-router-dom";
import { FaUsers, FaHome } from "react-icons/fa";
import { MdContacts } from "react-icons/md";
import { GrServices } from "react-icons/gr";
import { useAuth } from '../../store/auth';
import './Admin-Layout.css';

export const AdminLayout = () => {
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (user !== null) {
            setIsLoading(false);
        }
    }, [user]);

    if (isLoading) {
        return <h1>Loading...</h1>;
    }
    
    if (!user || !user.isAdmin) {
        return <Navigate to="/" />;
    }

    return (
        <div className="admin-layout">
            <header className="admin-header">
                <div className="container">
                    <div className="logo">Admin Panel</div>
                    <nav className="admin-nav">
                        <ul>
                            <li>
                                <NavLink to="/admin/users" className={({ isActive }) => isActive ? 'active' : ''}>
                                    <FaUsers />
                                    <span>Users</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/admin/contacts" className={({ isActive }) => isActive ? 'active' : ''}>
                                    <MdContacts />
                                    <span>Contacts</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/services" className={({ isActive }) => isActive ? 'active' : ''}>
                                    <GrServices />
                                    <span>Services</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
                                    <FaHome />
                                    <span>Home</span>
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
            <main className="admin-main">
                <div className="container">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};
