import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import api from '../api';

const Transactions = ({ user, setUser }) => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        try {
            const response = await api.get('/transactions/');
            setTransactions(response.data);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };

    return (
        <div>
            <Navbar user={user} setUser={setUser} />
            <div className="container">
                <h1>Transactions</h1>

                {transactions.length === 0 ? (
                    <p>No transactions found</p>
                ) : (
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>User</th>
                                    <th>Total Amount</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                    <th>Items</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map(order => (
                                    <tr key={order.id}>
                                        <td>{order.id}</td>
                                        <td>{order.user_name}</td>
                                        <td>${order.total_amount}</td>
                                        <td><span className={`status-badge status-${order.status}`}>{order.status}</span></td>
                                        <td>{new Date(order.order_date).toLocaleString()}</td>
                                        <td>
                                            <ul className="items-list">
                                                {order.order_items.map(item => (
                                                    <li key={item.id}>{item.item_name} (x{item.quantity})</li>
                                                ))}
                                            </ul>
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

export default Transactions;
