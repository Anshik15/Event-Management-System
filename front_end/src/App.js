import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import api from './api';

// Pages
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import VendorDashboard from './pages/VendorDashboard';
import UserDashboard from './pages/UserDashboard';
import MaintainUser from './pages/MaintainUser';
import MaintainVendor from './pages/MaintainVendor';
import AddMembership from './pages/AddMembership';
import UpdateMembership from './pages/UpdateMembership';
import AddItem from './pages/AddItem';
import ProductStatus from './pages/ProductStatus';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderStatus from './pages/OrderStatus';
import Transactions from './pages/Transactions';
import Reports from './pages/Reports';
import YourItems from './pages/YourItems';
import UserRequests from './pages/UserRequests';
import RequestItem from './pages/RequestItem';
import GuestList from './pages/GuestList';
import VendorList from './pages/VendorList';

import LandingPage from './pages/LandingPage';

// Components
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const response = await api.get('/auth/user/');
            setUser(response.data);
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login setUser={setUser} />} />

                {/* Admin Routes */}
                <Route path="/admin" element={
                    <ProtectedRoute user={user} allowedRoles={['admin']}>
                        <AdminDashboard user={user} setUser={setUser} />
                    </ProtectedRoute>
                } />
                <Route path="/admin/users" element={
                    <ProtectedRoute user={user} allowedRoles={['admin']}>
                        <MaintainUser user={user} setUser={setUser} />
                    </ProtectedRoute>
                } />
                <Route path="/admin/vendors" element={
                    <ProtectedRoute user={user} allowedRoles={['admin']}>
                        <MaintainVendor user={user} setUser={setUser} />
                    </ProtectedRoute>
                } />
                <Route path="/admin/membership/add" element={
                    <ProtectedRoute user={user} allowedRoles={['admin']}>
                        <AddMembership user={user} setUser={setUser} />
                    </ProtectedRoute>
                } />
                <Route path="/admin/membership/update" element={
                    <ProtectedRoute user={user} allowedRoles={['admin']}>
                        <UpdateMembership user={user} setUser={setUser} />
                    </ProtectedRoute>
                } />
                <Route path="/admin/reports" element={
                    <ProtectedRoute user={user} allowedRoles={['admin']}>
                        <Reports user={user} setUser={setUser} />
                    </ProtectedRoute>
                } />
                <Route path="/admin/transactions" element={
                    <ProtectedRoute user={user} allowedRoles={['admin']}>
                        <Transactions user={user} setUser={setUser} />
                    </ProtectedRoute>
                } />

                {/* Vendor Routes */}
                <Route path="/vendor" element={
                    <ProtectedRoute user={user} allowedRoles={['vendor']}>
                        <VendorDashboard user={user} setUser={setUser} />
                    </ProtectedRoute>
                } />
                <Route path="/vendor/add-item" element={
                    <ProtectedRoute user={user} allowedRoles={['vendor']}>
                        <AddItem user={user} setUser={setUser} />
                    </ProtectedRoute>
                } />
                <Route path="/vendor/product-status" element={
                    <ProtectedRoute user={user} allowedRoles={['vendor']}>
                        <ProductStatus user={user} setUser={setUser} />
                    </ProtectedRoute>
                } />
                <Route path="/vendor/transactions" element={
                    <ProtectedRoute user={user} allowedRoles={['vendor']}>
                        <Transactions user={user} setUser={setUser} />
                    </ProtectedRoute>
                } />
                <Route path="/vendor/items" element={
                    <ProtectedRoute user={user} allowedRoles={['vendor']}>
                        <YourItems user={user} setUser={setUser} />
                    </ProtectedRoute>
                } />
                <Route path="/vendor/user-requests" element={
                    <ProtectedRoute user={user} allowedRoles={['vendor']}>
                        <UserRequests user={user} setUser={setUser} />
                    </ProtectedRoute>
                } />
                <Route path="/vendor/request-item" element={
                    <ProtectedRoute user={user} allowedRoles={['vendor']}>
                        <RequestItem user={user} setUser={setUser} />
                    </ProtectedRoute>
                } />

                {/* User Routes */}
                <Route path="/user" element={
                    <ProtectedRoute user={user} allowedRoles={['user']}>
                        <UserDashboard user={user} setUser={setUser} />
                    </ProtectedRoute>
                } />
                <Route path="/user/vendors" element={
                    <ProtectedRoute user={user} allowedRoles={['user']}>
                        <VendorList user={user} setUser={setUser} />
                    </ProtectedRoute>
                } />
                <Route path="/user/cart" element={
                    <ProtectedRoute user={user} allowedRoles={['user']}>
                        <Cart user={user} setUser={setUser} />
                    </ProtectedRoute>
                } />
                <Route path="/user/guest-list" element={
                    <ProtectedRoute user={user} allowedRoles={['user']}>
                        <GuestList user={user} setUser={setUser} />
                    </ProtectedRoute>
                } />
                <Route path="/user/checkout" element={
                    <ProtectedRoute user={user} allowedRoles={['user']}>
                        <Checkout user={user} setUser={setUser} />
                    </ProtectedRoute>
                } />
                <Route path="/user/orders" element={
                    <ProtectedRoute user={user} allowedRoles={['user']}>
                        <OrderStatus user={user} setUser={setUser} />
                    </ProtectedRoute>
                } />
            </Routes>
        </Router>
    );
}

export default App;
