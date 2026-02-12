import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import api from '../api';

const Reports = ({ user, setUser }) => {
    const [activeReport, setActiveReport] = useState('membership');
    const [reportData, setReportData] = useState([]);

    useEffect(() => {
        fetchReport(activeReport);
    }, [activeReport]);

    const fetchReport = async (reportType) => {
        try {
            const response = await api.get(`/admin/reports/${reportType}/`);
            setReportData(response.data);
        } catch (error) {
            console.error('Error fetching report:', error);
        }
    };

    return (
        <div>
            <Navbar user={user} setUser={setUser} />
            <div className="container">
                <h1>Reports</h1>

                <div className="report-tabs">
                    <button
                        className={activeReport === 'membership' ? 'active' : ''}
                        onClick={() => setActiveReport('membership')}
                    >
                        Membership Report
                    </button>
                    <button
                        className={activeReport === 'order' ? 'active' : ''}
                        onClick={() => setActiveReport('order')}
                    >
                        Order Report
                    </button>
                    <button
                        className={activeReport === 'vendor' ? 'active' : ''}
                        onClick={() => setActiveReport('vendor')}
                    >
                        Vendor Report
                    </button>
                </div>

                <div className="report-content">
                    {activeReport === 'membership' && (
                        <div className="table-container">
                            <h2>Membership Report</h2>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Membership #</th>
                                        <th>Vendor</th>
                                        <th>Start Date</th>
                                        <th>End Date</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reportData.map(item => (
                                        <tr key={item.id}>
                                            <td>{item.membership_number}</td>
                                            <td>{item.vendor_name}</td>
                                            <td>{item.start_date}</td>
                                            <td>{item.end_date}</td>
                                            <td><span className={`status-badge status-${item.status}`}>{item.status}</span></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {activeReport === 'order' && (
                        <div className="table-container">
                            <h2>Order Report</h2>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>User</th>
                                        <th>Total</th>
                                        <th>Status</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reportData.map(item => (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.user_name}</td>
                                            <td>${item.total_amount}</td>
                                            <td><span className={`status-badge status-${item.status}`}>{item.status}</span></td>
                                            <td>{new Date(item.order_date).toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {activeReport === 'vendor' && (
                        <div className="table-container">
                            <h2>Vendor Report</h2>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Username</th>
                                        <th>Email</th>
                                        <th>Name</th>
                                        <th>Contact</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reportData.map(item => (
                                        <tr key={item.id}>
                                            <td>{item.username}</td>
                                            <td>{item.email}</td>
                                            <td>{item.first_name} {item.last_name}</td>
                                            <td>{item.contact_info}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Reports;
