import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import api from '../api';

const UpdateMembership = ({ user, setUser }) => {
    const [membershipNumber, setMembershipNumber] = useState('');
    const [membership, setMembership] = useState(null);
    const [extension, setExtension] = useState('6');

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await api.get('/admin/membership/update/', {
                params: { membership_number: membershipNumber }
            });
            setMembership(response.data);
        } catch (error) {
            alert('Membership not found');
            setMembership(null);
        }
    };

    const handleExtend = async () => {
        try {
            await api.put('/admin/membership/update/', {
                membership_number: membershipNumber,
                action: 'extend',
                extension: extension
            });
            alert('Membership extended successfully!');
            handleSearch({ preventDefault: () => { } });
        } catch (error) {
            alert('Error extending membership');
        }
    };

    const handleCancel = async () => {
        if (window.confirm('Are you sure you want to cancel this membership?')) {
            try {
                await api.put('/admin/membership/update/', {
                    membership_number: membershipNumber,
                    action: 'cancel'
                });
                alert('Membership cancelled successfully!');
                setMembership(null);
                setMembershipNumber('');
            } catch (error) {
                alert('Error cancelling membership');
            }
        }
    };

    return (
        <div>
            <Navbar user={user} setUser={setUser} />
            <div className="container">
                <h1>Update Membership</h1>

                <div className="form-container">
                    <form onSubmit={handleSearch}>
                        <div className="form-group">
                            <label>Membership Number *</label>
                            <input
                                type="text"
                                value={membershipNumber}
                                onChange={(e) => setMembershipNumber(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn-primary">Search</button>
                    </form>
                </div>

                {membership && (
                    <div className="membership-details">
                        <h2>Membership Details</h2>
                        <div className="details-grid">
                            <div><strong>Vendor:</strong> {membership.vendor_name}</div>
                            <div><strong>Membership Number:</strong> {membership.membership_number}</div>
                            <div><strong>Start Date:</strong> {membership.start_date}</div>
                            <div><strong>End Date:</strong> {membership.end_date}</div>
                            <div><strong>Status:</strong> {membership.status}</div>
                        </div>

                        <div className="form-container">
                            <h3>Extend Membership</h3>
                            <div className="form-group">
                                <label>Extension Duration</label>
                                <div className="radio-group">
                                    <label>
                                        <input
                                            type="radio"
                                            value="6"
                                            checked={extension === '6'}
                                            onChange={(e) => setExtension(e.target.value)}
                                        />
                                        6 months
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            value="12"
                                            checked={extension === '12'}
                                            onChange={(e) => setExtension(e.target.value)}
                                        />
                                        1 year
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            value="24"
                                            checked={extension === '24'}
                                            onChange={(e) => setExtension(e.target.value)}
                                        />
                                        2 years
                                    </label>
                                </div>
                            </div>
                            <div className="form-actions">
                                <button onClick={handleExtend} className="btn-primary">Extend</button>
                                <button onClick={handleCancel} className="btn-danger">Cancel Membership</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UpdateMembership;
