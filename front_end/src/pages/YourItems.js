import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import api from '../api';

const YourItems = ({ user, setUser }) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const response = await api.get('/vendor/items/');
            setItems(response.data);
            setLoading(false);
        } catch (error) {
            setError('Failed to fetch items');
            setLoading(false);
        }
    };

    const handleDelete = async (itemId) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            try {
                await api.delete('/vendor/items/', { data: { id: itemId } });
                setItems(items.filter(item => item.id !== itemId));
            } catch (error) {
                alert('Failed to delete item');
            }
        }
    };

    if (loading) return <div className="loading">Loading...</div>;

    return (
        <div>
            <Navbar user={user} setUser={setUser} />
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h1>Your Items</h1>
                    <Link to="/vendor/add-item" className="btn-primary">Insert New Item</Link>
                </div>

                {error && <div className="error-message">{error}</div>}

                {items.length === 0 ? (
                    <p>No items found. <Link to="/vendor/add-item">Add your first item</Link></p>
                ) : (
                    <div className="items-grid">
                        {items.map(item => (
                            <div key={item.id} className="item-card" style={{ padding: '0' }}>
                                {item.image ? (
                                    <div style={{ height: '180px', width: '100%', overflow: 'hidden' }}>
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    </div>
                                ) : (
                                    <div style={{ height: '180px', width: '100%', backgroundColor: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888' }}>
                                        No Image
                                    </div>
                                )}
                                <div style={{ padding: '1.5rem' }}>
                                    <h3 style={{ marginTop: '0' }}>{item.name}</h3>
                                    <p className="price">${item.price}</p>
                                    <p>{item.description}</p>
                                    <div style={{ marginTop: '1rem' }}>
                                        <span className={`status-badge status-${item.status}`}>
                                            {item.status.replace('_', ' ')}
                                        </span>
                                    </div>
                                    <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.5rem' }}>
                                        <button
                                            className="btn-danger"
                                            onClick={() => handleDelete(item.id)}
                                            style={{ padding: '0.5rem 1rem', borderRadius: '6px', border: 'none', color: 'white', cursor: 'pointer' }}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default YourItems;
