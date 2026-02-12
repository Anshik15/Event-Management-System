import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const Cart = ({ user, setUser }) => {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            const response = await api.get('/user/cart/');
            setCartItems(response.data);
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    };

    const updateQuantity = async (id, quantity) => {
        if (quantity < 1) return;
        try {
            await api.put('/user/cart/', { id, quantity });
            fetchCart();
        } catch (error) {
            alert('Error updating quantity');
        }
    };

    const removeItem = async (id) => {
        try {
            await api.delete('/user/cart/', { data: { id } });
            fetchCart();
        } catch (error) {
            alert('Error removing item');
        }
    };

    const calculateTotal = () => {
        return cartItems.reduce((sum, item) => sum + (item.item_price * item.quantity), 0).toFixed(2);
    };

    const proceedToCheckout = () => {
        navigate('/user/checkout');
    };

    return (
        <div>
            <Navbar user={user} setUser={setUser} />
            <div className="container">
                <h1>Shopping Cart</h1>

                {cartItems.length === 0 ? (
                    <p>Your cart is empty</p>
                ) : (
                    <>
                        <div className="table-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Item</th>
                                        <th>Vendor</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Subtotal</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map(item => (
                                        <tr key={item.id}>
                                            <td>
                                                {item.item_image ? (
                                                    <img src={item.item_image} alt={item.item_name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />
                                                ) : (
                                                    <div style={{ width: '50px', height: '50px', backgroundColor: '#eee', borderRadius: '4px' }} />
                                                )}
                                            </td>
                                            <td>{item.item_name}</td>
                                            <td>{item.vendor_name}</td>
                                            <td>${item.item_price}</td>
                                            <td>
                                                <div className="quantity-controls">
                                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                                                    <span>{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                                </div>
                                            </td>
                                            <td>${(item.item_price * item.quantity).toFixed(2)}</td>
                                            <td>
                                                <button onClick={() => removeItem(item.id)} className="btn-small btn-danger">
                                                    Remove
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="cart-summary">
                            <h2>Total: ${calculateTotal()}</h2>
                            <button onClick={proceedToCheckout} className="btn-primary">
                                Proceed to Checkout
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Cart;
