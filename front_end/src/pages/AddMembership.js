import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import api from '../api';

const AddMembership = ({ user, setUser }) => {
    const [vendors, setVendors] = useState([]);
    const [formData, setFormData] = useState({
        vendor: '',
        membership_number: '',
        start_date: '',
        duration: '6'
    });

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
            await api.post('/admin/membership/add/', formData);
            alert('Membership added successfully!');
            setFormData({
                vendor: '',
                membership_number: '',
                start_date: '',
                duration: '6'
            });
        } catch (error) {
            alert(error.response?.data?.membership_number?.[0] || 'Error adding membership');
        }
    };

    return (
        <div>
            <Navbar user={user} setUser={setUser} />
            <div className="container">
                <h1>Add Membership</h1>

                <div className="form-container">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Vendor *</label>
                            <select name="vendor" value={formData.vendor} onChange={handleChange} required>
                                <option value="">Select Vendor</option>
                                {vendors.map(v => (
                                    <option key={v.id} value={v.id}>{v.username}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Membership Number *</label>
                            <input
                                type="text"
                                name="membership_number"
                                value={formData.membership_number}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Start Date *</label>
                            <input
                                type="date"
                                name="start_date"
                                value={formData.start_date}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Duration *</label>
                            <div className="radio-group">
                                <label>
                                    <input
                                        type="radio"
                                        name="duration"
                                        value="6"
                                        checked={formData.duration === '6'}
                                        onChange={handleChange}
                                    />
                                    6 months
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="duration"
                                        value="12"
                                        checked={formData.duration === '12'}
                                        onChange={handleChange}
                                    />
                                    1 year
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="duration"
                                        value="24"
                                        checked={formData.duration === '24'}
                                        onChange={handleChange}
                                    />
                                    2 years
                                </label>
                            </div>
                        </div>

                        <button type="submit" className="btn-primary">Add Membership</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddMembership;
