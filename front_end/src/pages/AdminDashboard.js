import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const AdminDashboard = ({ user, setUser }) => {
    return (
        <div style={styles.dashboardContainer}>
            <Navbar user={user} setUser={setUser} />
            <div className="container" style={styles.contentContainer}>

                {/* Header Section */}
                <div style={styles.header}>
                    <h1 style={styles.title}>Admin Dashboard</h1>
                    <div style={styles.userInfo}>
                        <p style={styles.welcomeText}>Welcome, <strong>{user.username}</strong></p>
                        <span style={styles.userRole}>Admin Access</span>
                    </div>
                </div>

                {/* Maintenance Menu Section */}
                <div style={styles.sectionHeader}>
                    <h2 style={styles.sectionTitle}>Maintenance Menu</h2>
                    <p style={styles.sectionSubtitle}>Manage system components and users</p>
                </div>

                <div style={styles.gridContainer}>
                    {/* 1. Add/Update Memberships */}
                    <div style={styles.card}>
                        <div style={{ ...styles.cardHeader, backgroundColor: '#6c5ce7' }}>Memberships</div>
                        <div style={styles.cardBody}>
                            <h4 style={styles.cardTitle}>Manage Memberships</h4>
                            <p style={styles.cardDesc}>Add or update vendor memberships.</p>
                            <div style={styles.cardActions}>
                                <Link to="/admin/membership/add" style={styles.actionLink}>Add New</Link>
                                <Link to="/admin/membership/update" style={styles.actionLink}>Update Existing</Link>
                            </div>
                        </div>
                    </div>

                    {/* 2. Add/Update User, Vendor */}
                    <div style={styles.card}>
                        <div style={{ ...styles.cardHeader, backgroundColor: '#0984e3' }}>Registration</div>
                        <div style={styles.cardBody}>
                            <h4 style={styles.cardTitle}>User & Vendor Entry</h4>
                            <p style={styles.cardDesc}>Register new users and vendors manually.</p>
                            <div style={styles.cardActions}>
                                <Link to="/admin/users" style={styles.actionLink}>Add User</Link>
                                <Link to="/admin/vendors" style={styles.actionLink}>Add Vendor</Link>
                            </div>
                        </div>
                    </div>

                    {/* 3. Users Management */}
                    <div style={styles.card}>
                        <div style={{ ...styles.cardHeader, backgroundColor: '#00b894' }}>Users</div>
                        <div style={styles.cardBody}>
                            <h4 style={styles.cardTitle}>User Management</h4>
                            <p style={styles.cardDesc}>View, edit, or remove system users.</p>
                            <div style={styles.cardActions}>
                                <Link to="/admin/users" style={styles.btnPrimary}>Manage Users</Link>
                            </div>
                        </div>
                    </div>

                    {/* 4. Vendor Management */}
                    <div style={styles.card}>
                        <div style={{ ...styles.cardHeader, backgroundColor: '#e17055' }}>Vendors</div>
                        <div style={styles.cardBody}>
                            <h4 style={styles.cardTitle}>Vendor Management</h4>
                            <p style={styles.cardDesc}>Oversee vendor profiles and status.</p>
                            <div style={styles.cardActions}>
                                <Link to="/admin/vendors" style={styles.btnPrimary}>Manage Vendors</Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Secondary Sections */}
                <div style={{ ...styles.sectionHeader, marginTop: '3rem' }}>
                    <h2 style={styles.sectionTitle}>System Overview</h2>
                </div>

                <div style={styles.gridContainer}>
                    <div style={styles.infoCard}>
                        <h3 style={styles.infoTitle}>Reports</h3>
                        <p>Generate and view system-wide reports.</p>
                        <Link to="/admin/reports" style={styles.textLink}>View Reports &rarr;</Link>
                    </div>

                    <div style={styles.infoCard}>
                        <h3 style={styles.infoTitle}>Transactions</h3>
                        <p>Monitor financial transactions and history.</p>
                        <Link to="/admin/transactions" style={styles.textLink}>View Transactions &rarr;</Link>
                    </div>
                </div>

                {/* Role Switcher */}
                <div style={styles.roleSwitcher}>
                    <h3>Switch Role View</h3>
                    <p>Navigate the application as a different user type for testing.</p>
                    <div style={styles.switcherActions}>
                        <Link to="/vendor" style={styles.switcherBtn}>Vendor Dashboard</Link>
                        <Link to="/user" style={styles.switcherBtn}>User Dashboard</Link>
                    </div>
                </div>

            </div>
        </div>
    );
};

// Internal Styles for a "Beautiful" UI
const styles = {
    dashboardContainer: {
        backgroundColor: '#f4f7f6',
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
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
    },
    title: {
        margin: 0,
        color: '#2d3436',
        fontSize: '1.8rem',
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
        backgroundColor: '#e17055',
        color: 'white',
        padding: '0.25rem 0.75rem',
        borderRadius: '20px',
        fontSize: '0.8rem',
        marginTop: '0.25rem',
    },
    sectionHeader: {
        marginBottom: '1.5rem',
        borderLeft: '5px solid #6c5ce7',
        paddingLeft: '1rem',
    },
    sectionTitle: {
        margin: 0,
        color: '#2d3436',
        fontSize: '1.4rem',
    },
    sectionSubtitle: {
        margin: 0,
        color: '#b2bec3',
        fontSize: '0.9rem',
        marginTop: '0.25rem',
    },
    gridContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 10px 20px rgba(0,0,0,0.05)',
        transition: 'transform 0.2s',
        display: 'flex',
        flexDirection: 'column',
    },
    cardHeader: {
        padding: '1rem',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '1.1rem',
        textAlign: 'center',
    },
    cardBody: {
        padding: '1.5rem',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    cardTitle: {
        margin: '0 0 0.5rem 0',
        color: '#2d3436',
    },
    cardDesc: {
        color: '#636e72',
        fontSize: '0.9rem',
        marginBottom: '1.5rem',
    },
    cardActions: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
    },
    actionLink: {
        display: 'block',
        textAlign: 'center',
        padding: '0.5rem',
        backgroundColor: '#f1f2f6',
        color: '#2d3436',
        borderRadius: '6px',
        textDecoration: 'none',
        fontSize: '0.9rem',
        transition: 'background 0.2s',
    },
    btnPrimary: {
        display: 'block',
        textAlign: 'center',
        padding: '0.6rem',
        backgroundColor: '#0984e3',
        color: 'white',
        borderRadius: '6px',
        textDecoration: 'none',
        fontWeight: '500',
    },
    infoCard: {
        backgroundColor: 'white',
        padding: '1.5rem',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
        borderTop: '4px solid #fdcb6e',
    },
    infoTitle: {
        margin: '0 0 0.5rem 0',
        color: '#2d3436',
    },
    textLink: {
        color: '#0984e3',
        textDecoration: 'none',
        fontWeight: '500',
        marginTop: '0.5rem',
        display: 'inline-block',
    },
    roleSwitcher: {
        marginTop: '4rem',
        backgroundColor: '#dfe6e9',
        padding: '2rem',
        borderRadius: '12px',
        textAlign: 'center',
    },
    switcherActions: {
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
        marginTop: '1rem',
    },
    switcherBtn: {
        padding: '0.8rem 1.5rem',
        backgroundColor: '#636e72',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '30px',
        fontWeight: '500',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    },
};

export default AdminDashboard;
