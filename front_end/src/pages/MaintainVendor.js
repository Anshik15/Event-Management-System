import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import api from '../api';

const MaintainVendor = ({ user, setUser }) => {
    const [vendors, setVendors] = useState([]);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        contact_info: ''
    });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchVendors();
    }, []);

    const fetchVendors = async () => {
        try {
            const response = await api.get('/admin/vendors/');
            setVendors(response.data);
        } catch (error) {
            console.error('Error fetching vendors:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await api.put('/admin/vendors/', { ...formData, id: editingId });
                alert('Vendor updated successfully!');
            } else {
                await api.post('/admin/vendors/', formData);
                alert('Vendor added successfully!');
            }
            resetForm();
            fetchVendors();
        } catch (error) {
            alert('Error saving vendor');
        }
    };

    const handleEdit = (vendor) => {
        setFormData({
            username: vendor.username,
            email: vendor.email,
            password: '',
            first_name: vendor.first_name,
            last_name: vendor.last_name,
            contact_info: vendor.contact_info
        });
        setEditingId(vendor.id);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this vendor?')) {
            try {
                await api.delete('/admin/vendors/', { data: { id } });
                alert('Vendor deleted successfully!');
                fetchVendors();
            } catch (error) {
                alert('Error deleting vendor');
            }
        }
    };

    const resetForm = () => {
        setFormData({
            username: '',
            email: '',
            password: '',
            first_name: '',
            last_name: '',
            contact_info: ''
        });
        setEditingId(null);
    };

    return (
        <div>
            <Navbar user={user} setUser={setUser} />
            <div className="container">
                <h1>Maintain Vendors</h1>

                <div className="form-container">
                    <h2>{editingId ? 'Edit Vendor' : 'Add New Vendor'}</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Username *</label>
                            <input type="text" name="username" value={formData.username} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Email *</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Password {editingId ? '(leave blank to keep current)' : '*'}</label>
                            <input type="password" name="password" value={formData.password} onChange={handleChange} required={!editingId} />
                        </div>
                        <div className="form-group">
                            <label>First Name</label>
                            <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Last Name</label>
                            <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Contact Info</label>
                            <textarea name="contact_info" value={formData.contact_info} onChange={handleChange} rows="3" />
                        </div>
                        <div className="form-actions">
                            <button type="submit" className="btn-primary">{editingId ? 'Update' : 'Add'} Vendor</button>
                            {editingId && <button type="button" onClick={resetForm} className="btn-secondary">Cancel</button>}
                        </div>
                    </form>
                </div>

                <div className="table-container">
                    <h2>Vendor List</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Name</th>
                                <th>Contact</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vendors.map(v => (
                                <tr key={v.id}>
                                    <td>{v.username}</td>
                                    <td>{v.email}</td>
                                    <td>{v.first_name} {v.last_name}</td>
                                    <td>{v.contact_info}</td>
                                    <td>
                                        <button onClick={() => handleEdit(v)} className="btn-small">Edit</button>
                                        <button onClick={() => handleDelete(v.id)} className="btn-small btn-danger">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MaintainVendor;
