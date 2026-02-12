import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const AddItem = ({ user, setUser }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        status: 'available'
    });
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('name', formData.name);
        data.append('description', formData.description);
        data.append('price', formData.price);
        data.append('status', formData.status);
        if (image) {
            data.append('image', image);
        }

        try {
            await api.post('/vendor/items/', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Item added successfully!');
            navigate('/vendor/items');
        } catch (error) {
            console.error(error);
            alert('Error adding item');
        }
    };

    return (
        <div>
            <Navbar user={user} setUser={setUser} />
            <div className="container">
                <h1>Add New Item</h1>

                <div className="form-container">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Item Name *</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Description *</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="4"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Price *</label>
                            <input
                                type="number"
                                step="0.01"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Status *</label>
                            <select name="status" value={formData.status} onChange={handleChange} required>
                                <option value="available">Available</option>
                                <option value="out_of_stock">Out of Stock</option>
                                <option value="discontinued">Discontinued</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Item Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                            {preview && (
                                <div style={{ marginTop: '10px' }}>
                                    <img src={preview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '4px' }} />
                                </div>
                            )}
                        </div>

                        <button type="submit" className="btn-primary">Add Item</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddItem;
