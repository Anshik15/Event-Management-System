import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import api from '../api';

const GuestList = ({ user, setUser }) => {
    const [guests, setGuests] = useState([]);
    const [formData, setFormData] = useState({ name: '', email: '', status: 'invited' });
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchGuests();
    }, []);

    const fetchGuests = async () => {
        try {
            const response = await api.get('/user/guests/');
            setGuests(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching guests:', error);
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await api.put('/user/guests/', { id: editingId, ...formData });
            } else {
                await api.post('/user/guests/', formData);
            }
            setFormData({ name: '', email: '', status: 'invited' });
            setEditingId(null);
            fetchGuests();
        } catch (error) {
            alert('Failed to save guest');
        }
    };

    const handleEdit = (guest) => {
        setFormData({ name: guest.name, email: guest.email, status: guest.status });
        setEditingId(guest.id);
    };

    const handleDelete = async (guestId) => {
        if (window.confirm('Are you sure you want to delete this guest?')) {
            try {
                await api.delete('/user/guests/', { data: { id: guestId } });
                fetchGuests();
            } catch (error) {
                alert('Failed to delete guest');
            }
        }
    };

    if (loading) return <div className="loading">Loading...</div>;

    return (
        <div>
            <Navbar user={user} setUser={setUser} />
            <div className="container">
                <h1>Guest List Management</h1>

                {/* Update / Add Form */}
                <div className="add-item-form" style={{ marginBottom: '2rem' }}>
                    <h2>{editingId ? 'Update Guest' : 'Add New Guest'}</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Status</label>
                            <select name="status" value={formData.status} onChange={handleInputChange}>
                                <option value="invited">Invited</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="declined">Declined</option>
                            </select>
                        </div>
                        <button type="submit" className="btn-primary">
                            {editingId ? 'Update Guest' : 'Add Guest'}
                        </button>
                        {editingId && (
                            <button
                                type="button"
                                className="btn-secondary"
                                onClick={() => {
                                    setEditingId(null);
                                    setFormData({ name: '', email: '', status: 'invited' });
                                }}
                                style={{ marginLeft: '1rem' }}
                            >
                                Cancel Edit
                            </button>
                        )}
                    </form>
                </div>

                {/* Guest List Display */}
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {guests.map(guest => (
                                <tr key={guest.id}>
                                    <td>{guest.name}</td>
                                    <td>{guest.email}</td>
                                    <td>
                                        <span className={`status-badge status-${guest.status}`}>
                                            {guest.status}
                                        </span>
                                    </td>
                                    <td>
                                        <button onClick={() => handleEdit(guest)} className="btn-small btn-secondary" style={{ marginRight: '0.5rem' }}>Update</button>
                                        <button onClick={() => handleDelete(guest.id)} className="btn-small btn-danger">Delete</button>
                                    </td>
                                </tr>
                            ))}
                            {guests.length === 0 && (
                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center' }}>No guests added yet.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default GuestList;
