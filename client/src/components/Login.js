import React from 'react';

function Login({ setIsLoggedIn, setIsAdmin, userID, setUserID, userPhoneNumber, setUserPhoneNumber }) {

  const handleLogin = async () => {
      const response = await fetch('https://clinical-trial-app.onrender.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userID: userID, phoneNumber: userPhoneNumber }),
      });
      const data = await response.json();
      if (data.status === 200) {
        setIsLoggedIn(true);

        setIsAdmin(data.isAdmin);
        setUserID(data.userID);
        setUserPhoneNumber(data.phoneNumber);
      } else if(data.status === 203 ) {
        alert('הניסוי טרם התחיל עבור נסיין זה');
        setUserID("");
        setUserPhoneNumber("");
      } else {
        alert ("שגיאת התחברות או סיסמא לא נכונה");
        setUserID("");
        setUserPhoneNumber("");
      }
  };

  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen p-4 sm:p-6 lg:p-8 bg-gradient-to-r from-gray-950 to-blue-600">
      <div className="absolute top-8">
        <img src="/logo.webp" alt="logo" width={100} height="auto" className="md:w-32" />
      </div>
      
      <div className="bg-gray-300 p-6 sm:p-8 rounded border border-gray-400 shadow-md w-full max-w-sm">
        <input
          className="shadow border text-right rounded w-full py-2 px-3 mb-4 text-gray-700"
          value={userID} 
          onChange={(e) => setUserID(e.target.value)} 
          placeholder="   שינוייייי קוד אישי"
          required
        />
        <input
          className="shadow border text-right rounded w-full py-2 px-3 mb-6 text-gray-700"
          value={userPhoneNumber} 
          onChange={(e) => setUserPhoneNumber(e.target.value)} 
          placeholder="מס' טלפון (ללא מקפים)"
          required
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
          onClick={handleLogin}
        >
          התחברות
        </button>
      </div>
    </div>
  );
  
}

export default Login;
