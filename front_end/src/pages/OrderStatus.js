import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import api from '../api';

const OrderStatus = ({ user, setUser }) => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await api.get('/user/orders/');
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    return (
        <div>
            <Navbar user={user} setUser={setUser} />
            <div className="container">
                <h1>Order Status</h1>

                {orders.length === 0 ? (
                    <p>No orders found</p>
                ) : (
                    <div className="orders-list">
                        {orders.map(order => (
                            <div key={order.id} className="order-card">
                                <div className="order-header">
                                    <h3>Order #{order.id}</h3>
                                    <span className={`status-badge status-${order.status}`}>{order.status}</span>
                                </div>
                                <div className="order-details">
                                    <p><strong>Date:</strong> {new Date(order.order_date).toLocaleString()}</p>
                                    <p><strong>Total:</strong> ${order.total_amount}</p>
                                </div>
                                <div className="order-items">
                                    <h4>Items:</h4>
                                    <ul style={{ listStyle: 'none', padding: 0 }}>
                                        {order.order_items.map(item => (
                                            <li key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>
                                                {item.item_image ? (
                                                    <img src={item.item_image} alt={item.item_name} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                                                ) : (
                                                    <div style={{ width: '40px', height: '40px', backgroundColor: '#eee', borderRadius: '4px' }} />
                                                )}
                                                <div>
                                                    <strong>{item.item_name}</strong> - Qty: {item.quantity} - ${item.price}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderStatus;
