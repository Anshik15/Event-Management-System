import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const VendorDashboard = ({ user, setUser }) => {
    return (
        <div style={styles.dashboardContainer}>
            <Navbar user={user} setUser={setUser} />
            <div className="container" style={styles.contentContainer}>

                {/* Header Section */}
                <div style={styles.header}>
                    <h1 style={styles.title}>Vendor Dashboard</h1>
                    <div style={styles.userInfo}>
                        <p style={styles.welcomeText}>Welcome, <strong>{user.username}</strong></p>
                        <span style={styles.userRole}>Vendor Partner</span>
                    </div>
                </div>

                {/* Main Actions Section */}
                <div style={styles.sectionHeader}>
                    <h2 style={styles.sectionTitle}>Inventory & Store Management</h2>
                    <p style={styles.sectionSubtitle}>Manage your products, requests, and performance</p>
                </div>

                <div style={styles.gridContainer}>
                    {/* 1. Your Items */}
                    <div style={styles.card}>
                        <div style={{ ...styles.cardHeader, backgroundColor: '#00b894' }}>Inventory</div>
                        <div style={styles.cardBody}>
                            <h4 style={styles.cardTitle}>Your Items</h4>
                            <p style={styles.cardDesc}>View and manage your current product listings.</p>
                            <div style={styles.cardActions}>
                                <Link to="/vendor/items" style={styles.btnPrimary}>Manage Items</Link>
                            </div>
                        </div>
                    </div>

                    {/* 2. Add New Item */}
                    <div style={styles.card}>
                        <div style={{ ...styles.cardHeader, backgroundColor: '#6c5ce7' }}>Listing</div>
                        <div style={styles.cardBody}>
                            <h4 style={styles.cardTitle}>Add New Item</h4>
                            <p style={styles.cardDesc}>Post a new product with images and details.</p>
                            <div style={styles.cardActions}>
                                <Link to="/vendor/add-item" style={{ ...styles.btnPrimary, backgroundColor: '#6c5ce7' }}>Add Product</Link>
                            </div>
                        </div>
                    </div>

                    {/* 3. Product Status */}
                    <div style={styles.card}>
                        <div style={{ ...styles.cardHeader, backgroundColor: '#0984e3' }}>Monitoring</div>
                        <div style={styles.cardBody}>
                            <h4 style={styles.cardTitle}>Product Status</h4>
                            <p style={styles.cardDesc}>Quick check on availability and live status.</p>
                            <div style={styles.cardActions}>
                                <Link to="/vendor/product-status" style={{ ...styles.btnPrimary, backgroundColor: '#0984e3' }}>Check Status</Link>
                            </div>
                        </div>
                    </div>

                    {/* 4. User Requests */}
                    <div style={styles.card}>
                        <div style={{ ...styles.cardHeader, backgroundColor: '#fdcb6e', color: '#2d3436' }}>Communication</div>
                        <div style={styles.cardBody}>
                            <h4 style={styles.cardTitle}>User Requests</h4>
                            <p style={styles.cardDesc}>Response to custom requests from customers.</p>
                            <div style={styles.cardActions}>
                                <Link to="/vendor/user-requests" style={{ ...styles.btnPrimary, backgroundColor: '#fdcb6e', color: '#2d3436' }}>View Requests</Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Performance & Other Sections */}
                <div style={{ ...styles.sectionHeader, marginTop: '3rem' }}>
                    <h2 style={styles.sectionTitle}>Insights & Discovery</h2>
                </div>

                <div style={styles.gridContainer}>
                    <div style={styles.infoCard}>
                        <h3 style={styles.infoTitle}>Transactions</h3>
                        <p style={{ color: '#636e72', fontSize: '0.9rem' }}>Track your earnings and order fulfillment history.</p>
                        <Link to="/vendor/transactions" style={styles.textLink}>History Details &rarr;</Link>
                    </div>

                    <div style={styles.infoCard}>
                        <h3 style={styles.infoTitle}>Market Explorer</h3>
                        <p style={{ color: '#636e72', fontSize: '0.9rem' }}>Browse what other vendors are currently offering.</p>
                        <Link to="/vendor/request-item" style={styles.textLink}>Browse Market &rarr;</Link>
                    </div>
                </div>

            </div>
        </div>
    );
};

// Internal Styles for a "Beautiful" Vendor UI
const styles = {
    dashboardContainer: {
        backgroundColor: '#f8f9fa',
        minHeight: '100vh',
        fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
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
        padding: '1.5rem 2rem',
        borderRadius: '16px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        borderLeft: '8px solid #00b894',
    },
    title: {
        margin: 0,
        color: '#2d3436',
        fontSize: '2rem',
        fontWeight: '700',
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
        backgroundColor: '#00b894',
        color: 'white',
        padding: '0.3rem 1rem',
        borderRadius: '30px',
        fontSize: '0.85rem',
        fontWeight: '600',
        marginTop: '0.5rem',
    },
    sectionHeader: {
        marginBottom: '2rem',
        paddingLeft: '0.5rem',
    },
    sectionTitle: {
        margin: 0,
        color: '#2d3436',
        fontSize: '1.6rem',
        fontWeight: '600',
    },
    sectionSubtitle: {
        margin: 0,
        color: '#a0a0a0',
        fontSize: '0.95rem',
        marginTop: '0.3rem',
    },
    gridContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '2rem',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
    },
    cardHeader: {
        padding: '0.8rem',
        color: 'white',
        fontWeight: '700',
        fontSize: '0.9rem',
        textAlign: 'center',
        textTransform: 'uppercase',
        letterSpacing: '1px',
    },
    cardBody: {
        padding: '2rem',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    cardTitle: {
        margin: '0 0 0.8rem 0',
        color: '#2d3436',
        fontSize: '1.3rem',
    },
    cardDesc: {
        color: '#636e72',
        fontSize: '0.95rem',
        lineHeight: '1.5',
        marginBottom: '2rem',
    },
    cardActions: {
        marginTop: 'auto',
    },
    btnPrimary: {
        display: 'block',
        textAlign: 'center',
        padding: '0.8rem',
        backgroundColor: '#00b894',
        color: 'white',
        borderRadius: '10px',
        textDecoration: 'none',
        fontWeight: '600',
        transition: 'filter 0.2s',
    },
    infoCard: {
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '16px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.04)',
        borderBottom: '5px solid #0984e3',
    },
    infoTitle: {
        margin: '0 0 0.5rem 0',
        color: '#2d3436',
        fontSize: '1.2rem',
    },
    textLink: {
        color: '#0984e3',
        textDecoration: 'none',
        fontWeight: '600',
        marginTop: '1rem',
        display: 'inline-block',
        fontSize: '0.9rem',
    },
};

export default VendorDashboard;
