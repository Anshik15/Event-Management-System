import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div style={styles.container}>
            <div style={styles.content}>
                <h1 style={styles.title}>Event Management System</h1>
                <p style={styles.subtitle}>Welcome to the comprehensive platform for managing your events.</p>
                <Link to="/login" style={styles.button}>Login</Link>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f5f6fa',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    },
    content: {
        textAlign: 'center',
        padding: '3rem',
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    },
    title: {
        color: '#2d3436',
        marginBottom: '1rem'
    },
    subtitle: {
        color: '#636e72',
        marginBottom: '2rem'
    },
    button: {
        display: 'inline-block',
        padding: '0.8rem 2rem',
        backgroundColor: '#0984e3',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '5px',
        fontSize: '1.1rem',
        transition: 'background-color 0.3s'
    }
};

export default LandingPage;
