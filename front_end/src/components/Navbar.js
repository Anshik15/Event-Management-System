import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

const Navbar = ({ user, setUser }) => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await api.post('/auth/logout/');
            setUser(null);
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    if (!user) return null;

    return (
        <nav className="navbar">
            <div className="nav-container">
                <h1 className="nav-logo">Event Management System</h1>
                <div className="nav-links">
                    {user.role === 'admin' && (
                        <>
                            <Link to="/admin">Dashboard</Link>
                            <Link to="/admin/users">Maintain Users</Link>
                            <Link to="/admin/vendors">Maintain Vendors</Link>
                            <Link to="/admin/membership/add">Add Membership</Link>
                            <Link to="/admin/membership/update">Update Membership</Link>
                            <Link to="/admin/reports">Reports</Link>
                            <Link to="/admin/transactions">Transactions</Link>
                        </>
                    )}
                    {user.role === 'vendor' && (
                        <>
                            <Link to="/vendor">Dashboard</Link>
                            <Link to="/vendor/add-item">Add Item</Link>
                            <Link to="/vendor/product-status">Product Status</Link>
                            <Link to="/vendor/transactions">Transactions</Link>
                        </>
                    )}
                    {user.role === 'user' && (
                        <>
                            <Link to="/user">Browse Vendors</Link>
                            <Link to="/user/cart">Cart</Link>
                            <Link to="/user/orders">Order Status</Link>
                        </>
                    )}
                    <button onClick={handleLogout} className="logout-btn">Logout</button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
