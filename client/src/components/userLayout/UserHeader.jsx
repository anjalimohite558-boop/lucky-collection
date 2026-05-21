import React from 'react';

const UserHeader = () => {
  return (
    <header style={styles.header}>
      <h1>User Dashboard</h1>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: '#3498db',
    color: '#fff',
    padding: '1rem',
    textAlign: 'center',
  },
};

export default UserHeader;
