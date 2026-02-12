import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const UserDashboard = ({ user, setUser }) => {
    return (
        <div style={styles.dashboardContainer}>
            <Navbar user={user} setUser={setUser} />
            <div className="container" style={styles.contentContainer}>

                {/* Header Section */}
                <div style={styles.header}>
                    <h1 style={styles.title}>User Dashboard</h1>
                    <div style={styles.userInfo}>
                        <p style={styles.welcomeText}>Welcome home, <strong>{user.username}</strong></p>
                        <span style={styles.userRole}>Event Host</span>
                    </div>
                </div>

                {/* Event Planning Section */}
                <div style={styles.sectionHeader}>
                    <h2 style={styles.sectionTitle}>Event Planning Center</h2>
                    <p style={styles.sectionSubtitle}>Everything you need to organize your perfect event</p>
                </div>

                <div style={styles.gridContainer}>
                    {/* 1. Browse Vendors */}
                    <div style={styles.card}>
                        <div style={{ ...styles.cardHeader, backgroundColor: '#6c5ce7' }}>Marketplace</div>
                        <div style={styles.cardBody}>
                            <h4 style={styles.cardTitle}>Browse Vendors</h4>
                            <p style={styles.cardDesc}>Discover top-rated catering, venues, and entertainment.</p>
                            <div style={styles.cardActions}>
                                <Link to="/user/vendors" style={styles.btnPrimary}>Explore Now</Link>
                            </div>
                        </div>
                    </div>

                    {/* 2. Shopping Cart */}
                    <div style={styles.card}>
                        <div style={{ ...styles.cardHeader, backgroundColor: '#ff7675' }}>Orders</div>
                        <div style={styles.cardBody}>
                            <h4 style={styles.cardTitle}>Shopping Cart</h4>
                            <p style={styles.cardDesc}>Review your selected services and proceed to payment.</p>
                            <div style={styles.cardActions}>
                                <Link to="/user/cart" style={{ ...styles.btnPrimary, backgroundColor: '#ff7675' }}>Go to Cart</Link>
                            </div>
                        </div>
                    </div>

                    {/* 3. Guest List */}
                    <div style={styles.card}>
                        <div style={{ ...styles.cardHeader, backgroundColor: '#0984e3' }}>Management</div>
                        <div style={styles.cardBody}>
                            <h4 style={styles.cardTitle}>Guest List</h4>
                            <p style={styles.cardDesc}>Keep track of your attendees and their RSVPs.</p>
                            <div style={styles.cardActions}>
                                <Link to="/user/guest-list" style={{ ...styles.btnPrimary, backgroundColor: '#0984e3' }}>Manage Guests</Link>
                            </div>
                        </div>
                    </div>

                    {/* 4. Order Status */}
                    <div style={styles.card}>
                        <div style={{ ...styles.cardHeader, backgroundColor: '#00b894' }}>Tracking</div>
                        <div style={styles.cardBody}>
                            <h4 style={styles.cardTitle}>Order Status</h4>
                            <p style={styles.cardDesc}>Monitor the real-time progress of your bookings.</p>
                            <div style={styles.cardActions}>
                                <Link to="/user/orders" style={{ ...styles.btnPrimary, backgroundColor: '#00b894' }}>Check Status</Link>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

// Internal Styles for a "Beautiful" User Dashboard
const styles = {
    dashboardContainer: {
        backgroundColor: '#f4f7f6',
        minHeight: '100vh',
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
    },
    contentContainer: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem 1rem',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '3rem',
        backgroundColor: 'white',
        padding: '1.5rem 2.5rem',
        borderRadius: '20px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.03)',
        borderRight: '8px solid #6c5ce7',
    },
    title: {
        margin: 0,
        color: '#2d3436',
        fontSize: '1.8rem',
        fontWeight: '800',
        letterSpacing: '-0.5px',
    },
    userInfo: {
        textAlign: 'right',
    },
    welcomeText: {
        margin: 0,
        color: '#636e72',
    },
    userRole: {
        display: 'inline-block',
        backgroundColor: '#6c5ce7',
        color: 'white',
        padding: '0.3rem 1.2rem',
        borderRadius: '50px',
        fontSize: '0.8rem',
        fontWeight: '700',
        marginTop: '0.6rem',
        textTransform: 'uppercase',
    },
    sectionHeader: {
        marginBottom: '2rem',
        paddingLeft: '0.5rem',
    },
    sectionTitle: {
        margin: 0,
        color: '#2d3436',
        fontSize: '1.5rem',
        fontWeight: '700',
    },
    sectionSubtitle: {
        margin: 0,
        color: '#95a5a6',
        fontSize: '0.95rem',
        marginTop: '0.3rem',
    },
    gridContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '2rem',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: '0 8px 30px rgba(0,0,0,0.05)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid rgba(0,0,0,0.03)',
    },
    cardHeader: {
        padding: '0.7rem',
        color: 'white',
        fontWeight: '700',
        fontSize: '0.75rem',
        textAlign: 'center',
        textTransform: 'uppercase',
        letterSpacing: '1.5px',
    },
    cardBody: {
        padding: '2rem',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    cardTitle: {
        margin: '0 0 1rem 0',
        color: '#2d3436',
        fontSize: '1.4rem',
        fontWeight: '700',
    },
    cardDesc: {
        color: '#636e72',
        fontSize: '0.9rem',
        lineHeight: '1.6',
        marginBottom: '2.5rem',
    },
    cardActions: {
        marginTop: 'auto',
    },
    btnPrimary: {
        display: 'block',
        textAlign: 'center',
        padding: '0.9rem',
        backgroundColor: '#6c5ce7',
        color: 'white',
        borderRadius: '14px',
        textDecoration: 'none',
        fontWeight: '700',
        fontSize: '0.95rem',
        boxShadow: '0 4px 12px rgba(108, 92, 231, 0.2)',
        transition: 'all 0.2s',
    },
};

export default UserDashboard;
