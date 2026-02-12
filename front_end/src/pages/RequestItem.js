import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import api from '../api';

const RequestItem = ({ user, setUser }) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            // Reusing the browse items endpoint which shows all available items
            const response = await api.get('/user/items/');
            setItems(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch items', error);
            setLoading(false);
        }
    };

    if (loading) return <div className="loading">Loading...</div>;

    return (
        <div>
            <Navbar user={user} setUser={setUser} />
            <div className="container">
                <h1>View Products</h1>
                <p>Browse all available items in the system.</p>

                <div className="items-grid">
                    {items.map(item => (
                        <div key={item.id} className="item-card">
                            <h3>{item.name}</h3>
                            <p className="vendor">Vendor: {item.vendor_name}</p>
                            <p className="price">${item.price}</p>
                            <p>{item.description}</p>
                            <div style={{ marginTop: '1rem' }}>
                                <span className={`status-badge status-${item.status}`}>
                                    {item.status.replace('_', ' ')}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RequestItem;
