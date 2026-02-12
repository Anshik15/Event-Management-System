import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const Login = ({ setUser }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        role: 'user',
        first_name: '',
        last_name: '',
        contact_info: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            if (isLogin) {
                const response = await api.post('/auth/login/', {
                    username: formData.username,
                    password: formData.password
                });
                setUser(response.data.user);

                if (response.data.user.role === 'admin') {
                    navigate('/admin');
                } else if (response.data.user.role === 'vendor') {
                    navigate('/vendor');
                } else {
                    navigate('/user');
                }
            } else {
                await api.post('/auth/signup/', formData);
                alert('Signup successful! Please login.');
                setIsLogin(true);
                setFormData({
                    username: '', password: '', email: '', role: 'user',
                    first_name: '', last_name: '', contact_info: ''
                });
            }
        } catch (error) {
            console.error('Auth error:', error.response?.data);
            if (error.response?.data) {
                const data = error.response.data;
                if (typeof data === 'string') setError(data);
                else if (data.error) setError(data.error);
                else {
                    const messages = Object.keys(data).map(key => {
                        const msg = Array.isArray(data[key]) ? data[key][0] : data[key];
                        return `${key}: ${msg}`;
                    });
                    setError(messages.join(', '));
                }
            } else {
                setError('An error occurred. Please try again.');
            }
        }
    };

    return (
        <div style={styles.authWrapper}>
            {/* Animated Background Shapes */}
            <div style={styles.bgShape1}></div>
            <div style={styles.bgShape2}></div>

            <div style={styles.authContainer}>
                <div style={styles.authBox}>
                    <div style={styles.brandSection}>
                        <h1 style={styles.brandTitle}>Event Hub</h1>
                        <p style={styles.brandSubtitle}>Manage. Connect. Celebrate.</p>
                    </div>

                    <div style={styles.formHeader}>
                        <h2 style={styles.title}>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
                        <p style={styles.subtitle}>
                            {isLogin
                                ? 'Enter your credentials to access your dashboard'
                                : 'Join our event management community today'}
                        </p>
                    </div>

                    {error && (
                        <div style={styles.errorAlert}>
                            <span style={{ fontSize: '1.2rem', marginRight: '0.5rem' }}>⚠️</span>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} style={styles.form}>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Username</label>
                            <input
                                type="text"
                                name="username"
                                style={styles.input}
                                placeholder="Enter your username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Password</label>
                            <input
                                type="password"
                                name="password"
                                style={styles.input}
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {!isLogin && (
                            <div style={styles.signupFields}>
                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        style={styles.input}
                                        placeholder="name@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div style={styles.row}>
                                    <div style={{ ...styles.inputGroup, flex: 1 }}>
                                        <label style={styles.label}>First Name</label>
                                        <input
                                            type="text"
                                            name="first_name"
                                            style={styles.input}
                                            value={formData.first_name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div style={{ ...styles.inputGroup, flex: 1 }}>
                                        <label style={styles.label}>Last Name</label>
                                        <input
                                            type="text"
                                            name="last_name"
                                            style={styles.input}
                                            value={formData.last_name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>I am a...</label>
                                    <select
                                        name="role"
                                        style={styles.select}
                                        value={formData.role}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="user">Individual User / Event Host</option>
                                        <option value="vendor">Vendor / Service Provider</option>
                                    </select>
                                </div>

                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>Contact Information</label>
                                    <textarea
                                        name="contact_info"
                                        style={{ ...styles.input, height: '80px', resize: 'none' }}
                                        placeholder="Phone number or address..."
                                        value={formData.contact_info}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        )}

                        <button type="submit" style={styles.submitBtn}>
                            {isLogin ? 'Sign In' : 'Create Account'}
                        </button>
                    </form>

                    <div style={styles.footer}>
                        <p style={styles.footerText}>
                            {isLogin ? "Don't have an account? " : "Already have an account? "}
                            <span
                                onClick={() => {
                                    setIsLogin(!isLogin);
                                    setError('');
                                }}
                                style={styles.toggleBtn}
                            >
                                {isLogin ? 'Join Now' : 'Sign In'}
                            </span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Global CSS for Animations */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes float {
                    0% { transform: translate(0, 0) rotate(0deg); }
                    33% { transform: translate(30px, 50px) rotate(5deg); }
                    66% { transform: translate(-20px, 20px) rotate(-5deg); }
                    100% { transform: translate(0, 0) rotate(0deg); }
                }
                body { margin: 0; overflow-x: hidden; }
            `}} />
        </div>
    );
};

const styles = {
    authWrapper: {
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0f172a',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
    },
    bgShape1: {
        position: 'absolute',
        top: '-10%',
        right: '-5%',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
        filter: 'blur(80px)',
        opacity: 0.4,
        zIndex: 1,
        animation: 'float 20s infinite ease-in-out',
    },
    bgShape2: {
        position: 'absolute',
        bottom: '-10%',
        left: '-5%',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #3b82f6 0%, #2dd4bf 100%)',
        filter: 'blur(100px)',
        opacity: 0.3,
        zIndex: 1,
        animation: 'float 25s infinite ease-in-out reverse',
    },
    authContainer: {
        width: '100%',
        padding: '2rem',
        display: 'flex',
        justifyContent: 'center',
        zIndex: 10,
    },
    authBox: {
        maxWidth: '480px',
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '24px',
        padding: '3rem',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        color: 'white',
    },
    brandSection: {
        textAlign: 'center',
        marginBottom: '2.5rem',
    },
    brandTitle: {
        fontSize: '2.5rem',
        fontWeight: '800',
        margin: 0,
        background: 'linear-gradient(to right, #818cf8, #c084fc)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        letterSpacing: '-1px',
    },
    brandSubtitle: {
        color: '#94a3b8',
        fontSize: '0.9rem',
        marginTop: '0.5rem',
        letterSpacing: '1px',
        textTransform: 'uppercase',
    },
    formHeader: {
        marginBottom: '2rem',
    },
    title: {
        fontSize: '1.75rem',
        fontWeight: '700',
        margin: '0 0 0.5rem 0',
    },
    subtitle: {
        color: '#94a3b8',
        fontSize: '0.95rem',
        lineHeight: '1.5',
    },
    errorAlert: {
        backgroundColor: 'rgba(239, 68, 68, 0.15)',
        border: '1px solid rgba(239, 68, 68, 0.2)',
        color: '#fca5a5',
        padding: '1rem',
        borderRadius: '12px',
        fontSize: '0.9rem',
        marginBottom: '1.5rem',
        display: 'flex',
        alignItems: 'center',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
    },
    row: {
        display: 'flex',
        gap: '1rem',
    },
    label: {
        fontSize: '0.85rem',
        fontWeight: '600',
        color: '#cbd5e1',
        marginLeft: '0.2rem',
    },
    input: {
        backgroundColor: 'rgba(15, 23, 42, 0.6)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        padding: '0.8rem 1rem',
        color: 'white',
        fontSize: '1rem',
        transition: 'all 0.2s',
        outline: 'none',
        width: '100%',
        boxSizing: 'border-box',
    },
    select: {
        backgroundColor: 'rgba(15, 23, 42, 0.6)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        padding: '0.8rem 1rem',
        color: 'white',
        fontSize: '1rem',
        appearance: 'none',
        outline: 'none',
        width: '100%',
        boxSizing: 'border-box',
    },
    signupFields: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
    },
    submitBtn: {
        marginTop: '1rem',
        padding: '1rem',
        borderRadius: '12px',
        border: 'none',
        background: 'linear-gradient(to right, #6366f1, #8b5cf6)',
        color: 'white',
        fontSize: '1rem',
        fontWeight: '700',
        cursor: 'pointer',
        transition: 'all 0.3s',
        boxShadow: '0 10px 15px -3px rgba(99, 102, 241, 0.3)',
    },
    footer: {
        marginTop: '2rem',
        textAlign: 'center',
    },
    footerText: {
        color: '#94a3b8',
        fontSize: '0.95rem',
    },
    toggleBtn: {
        color: '#818cf8',
        fontWeight: '700',
        cursor: 'pointer',
        transition: 'color 0.2s',
        borderBottom: '2px solid transparent',
    },
};

export default Login;
