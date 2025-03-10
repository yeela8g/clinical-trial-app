import React, { useState } from "react";

function Login({ setIsLoggedIn, setIsAdmin, userID, setUserID, userPhoneNumber, setUserPhoneNumber, setProtocolType }) {
  const [showPassword, setShowPassword] = useState(false);

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
      setProtocolType(data.protocolType);
    }
    else if (data.status === 203) {
      alert('הניסוי טרם התחיל עבור נסיין זה');
      setUserID("");
      setUserPhoneNumber("");
    } else {
      alert("שגיאת התחברות או סיסמא לא נכונה");
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
          placeholder="   קוד אישי"
          autocomplete="username"
          required
        />
        
        <div className="relative mb-6">
          <input
            className="shadow border text-right rounded w-full py-2 px-3 text-gray-700 pl-10" 
            type={showPassword ? "text" : "password"} 
            value={userPhoneNumber} 
            onChange={(e) => setUserPhoneNumber(e.target.value)} 
            placeholder="הזן סיסמא"
            autocomplete="current-password"
            required
          />
          <button 
            type="button" 
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 left-0 flex items-center px-3 text-sm text-gray-600 hover:text-gray-800"
          >
            {showPassword ? "הסתר" : "הצג"}
          </button>
        </div>
        
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
