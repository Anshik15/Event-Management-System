import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import api from '../api';

const ProductStatus = ({ user, setUser }) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const response = await api.get('/vendor/product-status/');
            setItems(response.data);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            try {
                await api.delete('/vendor/items/', { data: { id } });
                alert('Item deleted successfully!');
                fetchItems();
            } catch (error) {
                alert('Error deleting item');
            }
        }
    };

    return (
        <div>
            <Navbar user={user} setUser={setUser} />
            <div className="container">
                <h1>Product Status</h1>

                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Status</th>
                                <th>Created</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map(item => (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>{item.description}</td>
                                    <td>${item.price}</td>
                                    <td>{item.status}</td>
                                    <td>{new Date(item.created_at).toLocaleDateString()}</td>
                                    <td>
                                        <button onClick={() => handleDelete(item.id)} className="btn-small btn-danger">
                                            Delete
                                        </button>
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

export default ProductStatus;
