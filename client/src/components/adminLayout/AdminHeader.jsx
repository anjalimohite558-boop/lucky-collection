import React from 'react';

const AdminHeader = () => {
  return (
    <header style={styles.header}>
      <h1>Admin Panel</h1>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: '#222',
    color: '#fff',
    padding: '1rem',
    textAlign: 'center',
  },
};

export default AdminHeader;
