import React, { useState } from "react";

function AdminDashboard({ userID, handleLogout }) {
  const [newUserID, setNewUserID] = useState("");
  const [newUserPhoneNumber, setNewUserPhoneNumber] = useState(""); //not really phone number
  const [newUserStartDate, setNewUserStartDate] = useState("");

  const handleAddUser = async (e) => {
      e.preventDefault();
      const response = await fetch('https://clinical-trial-app.onrender.com/api/register', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userID: newUserID,
          phoneNumber: newUserPhoneNumber,
          startDate: newUserStartDate
        })
      });
      if (response.status === 200) {
        alert("המשתמש נוסף בהצלחה!");
        setNewUserID("");
        setNewUserPhoneNumber("");
      } else {
        alert("הוספה נכשלה או קלט לא תקין");
      }
  };

  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen p-4 sm:p-6 lg:p-8 bg-gradient-to-r from-gray-950 to-blue-600">
      <div className="absolute top-8">
        <img src="/logo.webp" alt="logo" width={100} height="auto" className="md:w-32" />
      </div>
  
      <div className="bg-gray-300 p-6 sm:p-8 rounded border border-gray-400 shadow-md w-full max-w-md mt-16 md:mt-24 lg:mt-32">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold mb-4 text-blue-900 text-center">
          {`! ${userID} ברוך הבא`}
        </h1>
        <h2 className="text-lg font-bold mb-2 text-blue-900 text-center">
          <span className="border-b border-gray-50 border-dashed">: הוספת נסיין</span>
        </h2>
        <form onSubmit={handleAddUser}>
          <input
            className="shadow border rounded w-full py-2 px-3 mb-2 text-right text-gray-700"
            type="text"
            placeholder="קוד אישי חדש"
            value={newUserID}
            onChange={(e) => setNewUserID(e.target.value)}
            required
          />
          <input
            className="shadow border rounded w-full py-2 px-3 mb-2 text-right text-gray-700"
            type="text"
            placeholder="מס' טלפון (ללא מקפים)"
            value={newUserPhoneNumber}
            onChange={(e) => setNewUserPhoneNumber(e.target.value)}
            required
          />
         <div className="relative mb-4">
  <label 
    htmlFor="startDate"
    className="block text-gray-700 text-right mb-1"
  >
              :V1 תאריך התחלה
  </label>
  <input
    id="startDate"
    type="date"
    className="shadow border rounded w-full py-2 px-3 text-gray-700"
    value={newUserStartDate}
    onChange={(e) => setNewUserStartDate(e.target.value)}
    required
  />
</div>

          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-full mb-4">
            הוספה
          </button>
          <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded w-full">
            סיום
          </button>
        </form>
      </div>
    </div>
  );
  
}

export default AdminDashboard;
