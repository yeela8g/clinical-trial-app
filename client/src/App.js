import React, { useState } from 'react';
import Login from './components/Login.js';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const [isAdmin, setIsAdmin] = useState(false); // Track if the user is an admin
  const [userID, setUserID] = useState(''); // Store logged-in userID
  const [userPhoneNumber, setUserPhoneNumber] = useState('');

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserID('');
    setIsAdmin(false);
    setUserPhoneNumber('');
  };

  return (
    <div>
      {!isLoggedIn ? (
        <Login setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} userID={userID} setUserID={setUserID} userPhoneNumber={userPhoneNumber} setUserPhoneNumber={setUserPhoneNumber} />
      ) : isAdmin ? (
        <AdminDashboard userID={userID} handleLogout={handleLogout} />
      ) : (
        <UserDashboard userID={userID} userNumber={userPhoneNumber} handleLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
