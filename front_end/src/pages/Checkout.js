import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const Checkout = ({ user, setUser }) => {
    const [cartItems, setCartItems] = useState([]);
    const [step, setStep] = useState(1); // 1: Cart Summary, 2: Payment, 3: Total Amount, 4: Confirm
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

    const calculateTotal = () => {
        return cartItems.reduce((sum, item) => sum + (item.item_price * item.quantity), 0).toFixed(2);
    };

    const handleCheckout = async () => {
        try {
            await api.post('/user/checkout/');
            alert('Order placed successfully!');
            navigate('/user/orders');
        } catch (error) {
            alert(error.response?.data?.error || 'Error placing order');
        }
    };

    return (
        <div>
            <Navbar user={user} setUser={setUser} />
            <div className="container">
                <h1>Checkout Process</h1>

                {/* Step Indicator */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', borderBottom: '1px solid #ddd', paddingBottom: '1rem' }}>
                    <span style={{ fontWeight: step === 1 ? 'bold' : 'normal', color: step === 1 ? '#0984e3' : '#636e72' }}>1. Summary</span>
                    <span style={{ fontWeight: step === 2 ? 'bold' : 'normal', color: step === 2 ? '#0984e3' : '#636e72' }}>2. Payment</span>
                    <span style={{ fontWeight: step === 3 ? 'bold' : 'normal', color: step === 3 ? '#0984e3' : '#636e72' }}>3. Total Amount</span>
                </div>

                {step === 1 && (
                    <div className="checkout-step">
                        <h2>Order Summary</h2>
                        <div className="table-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Item</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map(item => (
                                        <tr key={item.id}>
                                            <td>{item.item_name}</td>
                                            <td>${item.item_price}</td>
                                            <td>{item.quantity}</td>
                                            <td>${(item.item_price * item.quantity).toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="form-actions">
                            <button onClick={() => setStep(2)} className="btn-primary">Proceed to Payment</button>
                            <button onClick={() => navigate('/user/cart')} className="btn-secondary">Back to Cart</button>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="checkout-step">
                        <h2>Payment Details</h2>
                        <div className="payment-form" style={{ maxWidth: '400px', margin: '0 auto', padding: '2rem', border: '1px solid #dfe6e9', borderRadius: '8px' }}>
                            <div className="form-group">
                                <label>Card Number (Mock)</label>
                                <input type="text" placeholder="XXXX-XXXX-XXXX-XXXX" disabled value="1234-5678-9012-3456" />
                            </div>
                            <div className="form-group">
                                <label>Expiry</label>
                                <input type="text" placeholder="MM/YY" disabled value="12/30" />
                            </div>
                            <div className="form-group">
                                <label>CVV</label>
                                <input type="text" placeholder="123" disabled value="123" />
                            </div>
                            <p style={{ color: '#00b894', fontSize: '0.9rem' }}>* This is a mock payment step.</p>
                        </div>
                        <div className="form-actions" style={{ marginTop: '2rem' }}>
                            <button onClick={() => setStep(3)} className="btn-primary">Review Total</button>
                            <button onClick={() => setStep(1)} className="btn-secondary">Back</button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="checkout-step">
                        <h2>Total Amount</h2>
                        <div className="total-display" style={{ textAlign: 'center', padding: '3rem', background: '#f1f2f6', borderRadius: '8px', marginBottom: '2rem' }}>
                            <h1 style={{ fontSize: '3rem', color: '#2d3436' }}>${calculateTotal()}</h1>
                            <p>Total amount to be charged</p>
                        </div>
                        <div className="form-actions">
                            <button onClick={handleCheckout} className="btn-primary" style={{ fontSize: '1.2rem', padding: '1rem 2rem' }}>Confirm & Pay</button>
                            <button onClick={() => navigate('/user/cart')} className="btn-danger">Cancel</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Checkout;
