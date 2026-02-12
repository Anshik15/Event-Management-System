import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import api from '../api';

const VendorList = ({ user, setUser }) => {
    const [vendors, setVendors] = useState([]);
    const [items, setItems] = useState([]);
    const [selectedVendor, setSelectedVendor] = useState(null);

    useEffect(() => {
        fetchVendors();
        fetchItems();
    }, []);

    const fetchVendors = async () => {
        try {
            const response = await api.get('/user/vendors/');
            setVendors(response.data);
        } catch (error) {
            console.error('Error fetching vendors:', error);
        }
    };

    const fetchItems = async () => {
        try {
            const response = await api.get('/user/items/');
            setItems(response.data);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };

    const addToCart = async (itemId) => {
        try {
            await api.post('/user/cart/', { item: itemId, quantity: 1 });
            alert('Item added to cart!');
        } catch (error) {
            alert('Failed to add item to cart');
        }
    };

    const requestItem = async (item) => {
        // Simple prompt for details - in a real app this would be a modal
        const details = prompt(`Enter details for your request of ${item.name}:`);
        if (details) {
            try {
                await api.post('/user-requests/', {
                    vendor: item.vendor,
                    item_name: item.name,
                    details: details
                });
                alert('Request sent to vendor!');
            } catch (error) {
                alert('Failed to send request');
            }
        }
    };

    const filteredItems = selectedVendor
        ? items.filter(item => item.vendor === selectedVendor)
        : items;

    return (
        <div>
            <Navbar user={user} setUser={setUser} />
            <div className="container">
                <h1>Browse Vendors & Items</h1>

                <div className="vendor-filter">
                    <label>Filter by Vendor:</label>
                    <select value={selectedVendor || ''} onChange={(e) => setSelectedVendor(e.target.value ? parseInt(e.target.value) : null)}>
                        <option value="">All Vendors</option>
                        {vendors.map(vendor => (
                            <option key={vendor.id} value={vendor.id}>{vendor.username}</option>
                        ))}
                    </select>
                </div>

                <div className="items-grid">
                    {filteredItems.map(item => (
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
                                <p>{item.description}</p>
                                <p className="price">${item.price}</p>
                                <p className="vendor">Vendor: {item.vendor_name}</p>
                                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                                    <button onClick={() => addToCart(item.id)} className="btn-primary">
                                        Add to Cart
                                    </button>
                                    <button onClick={() => requestItem(item)} className="btn-secondary">
                                        Request Custom
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default VendorList;
