import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import api from '../api';

const UserRequests = ({ user, setUser }) => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            const response = await api.get('/user-requests/');
            setRequests(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch requests', error);
            setLoading(false);
        }
    };

    const updateStatus = async (id, newStatus) => {
        try {
            await api.put('/user-requests/', { id, status: newStatus });
            fetchRequests(); // Refresh list
        } catch (error) {
            alert('Failed to update status');
        }
    };

    if (loading) return <div className="loading">Loading...</div>;

    return (
        <div>
            <Navbar user={user} setUser={setUser} />
            <div className="container">
                <h1>User Requests</h1>

                {requests.length === 0 ? (
                    <p>No requests found.</p>
                ) : (
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>User</th>
                                    <th>Item Requested</th>
                                    <th>Details</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {requests.map(req => (
                                    <tr key={req.id}>
                                        <td>{new Date(req.created_at).toLocaleDateString()}</td>
                                        <td>{req.user_name}</td>
                                        <td>{req.item_name}</td>
                                        <td>{req.details}</td>
                                        <td>
                                            <span className={`status-badge status-${req.status}`}>
                                                {req.status}
                                            </span>
                                        </td>
                                        <td>
                                            {req.status === 'pending' && (
                                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                    <button
                                                        className="btn-small"
                                                        style={{ background: '#55efc4', color: '#00b894' }}
                                                        onClick={() => updateStatus(req.id, 'approved')}
                                                    >
                                                        Approve
                                                    </button>
                                                    <button
                                                        className="btn-small"
                                                        style={{ background: '#ff7675', color: '#d63031' }}
                                                        onClick={() => updateStatus(req.id, 'rejected')}
                                                    >
                                                        Reject
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserRequests;
