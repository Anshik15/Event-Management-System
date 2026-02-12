import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import api from '../api';

const MaintainUser = ({ user, setUser }) => {
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        contact_info: '',
        role: 'user'
    });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await api.get('/admin/users/');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await api.put('/admin/users/', { ...formData, id: editingId });
                alert('User updated successfully!');
            } else {
                await api.post('/admin/users/', formData);
                alert('User added successfully!');
            }
            resetForm();
            fetchUsers();
        } catch (error) {
            alert('Error saving user');
        }
    };

    const handleEdit = (user) => {
        setFormData({
            username: user.username,
            email: user.email,
            password: '',
            first_name: user.first_name,
            last_name: user.last_name,
            contact_info: user.contact_info,
            role: user.role
        });
        setEditingId(user.id);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await api.delete('/admin/users/', { data: { id } });
                alert('User deleted successfully!');
                fetchUsers();
            } catch (error) {
                alert('Error deleting user');
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
            contact_info: '',
            role: 'user'
        });
        setEditingId(null);
    };

    return (
        <div>
            <Navbar user={user} setUser={setUser} />
            <div className="container">
                <h1>Maintain Users</h1>

                <div className="form-container">
                    <h2>{editingId ? 'Edit User' : 'Add New User'}</h2>
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
                            <button type="submit" className="btn-primary">{editingId ? 'Update' : 'Add'} User</button>
                            {editingId && <button type="button" onClick={resetForm} className="btn-secondary">Cancel</button>}
                        </div>
                    </form>
                </div>

                <div className="table-container">
                    <h2>User List</h2>
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
                            {users.map(u => (
                                <tr key={u.id}>
                                    <td>{u.username}</td>
                                    <td>{u.email}</td>
                                    <td>{u.first_name} {u.last_name}</td>
                                    <td>{u.contact_info}</td>
                                    <td>
                                        <button onClick={() => handleEdit(u)} className="btn-small">Edit</button>
                                        <button onClick={() => handleDelete(u.id)} className="btn-small btn-danger">Delete</button>
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

export default MaintainUser;
