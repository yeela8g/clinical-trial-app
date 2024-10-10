import React, { useState, useEffect } from "react";
import { FaCheckCircle, FaTasks } from "react-icons/fa";

function UserDashboard({ userID, handleLogout }) {
  const [isDone, setIsDone] = useState(false);
  const [isSurvey, setIsSurvey] = useState(false);

  const fetchTasks = async () => {
    //get tasks amount
    let response = await fetch(`https://clinical-trial-app.onrender.com/api/tasks/${userID}`);
    let data = await response.json();
    setIsSurvey(data.isSurvey);

    const response2 = await fetch(
      `https://clinical-trial-app.onrender.com/api/completeTasks/${userID}`
    );
    const data2 = await response2.json();
    if (data2.status === 200) {
      setIsDone(data2.completedTasks);
    }else{
      alert("could not fetch task status");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const completeDailyTasks = async () => {
    const response = await fetch(
      `https://clinical-trial-app.onrender.com/api/completeTasks/${userID}`,
      {
        method: "PUT",
      }
    );
    if (response.status === 200) {
      setIsDone(true);
    } else {
      alert("Failed to update tasks completion.");
    }
  };

  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen p-4 sm:p-6 lg:p-8 bg-gradient-to-r from-gray-950 to-blue-600">
      <div className="absolute top-8">
        <img src="/logo.webp" alt="logo" width={100} height="auto" className="md:w-32" />
      </div>
      
      <div className="bg-gray-300 p-6 sm:p-8 rounded border border-gray-400 shadow-md w-full max-w-lg mt-16 md:mt-24 lg:mt-32">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold mb-4 text-blue-900 text-center">
          {`! ${userID} ברוך הבא נסיין מס`}
        </h1>
        <h2 className="text-lg font-bold mb-2 text-blue-900 text-center">
          <span className="border-b border-gray-50 border-dashed">: משימות יומיות</span>
        </h2>
        <ul className="space-y-3 mb-6 w-full">
          <li className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md flex items-center justify-end gap-2 font-semibold shadow">
            נטילת התוסף (פעמיים ביום){""}
            <FaCheckCircle className={isDone ? "text-green-500" : "text-yellow-500"} />
          </li>
          {isSurvey && (
            <li
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md flex items-center justify-end gap-2 font-semibold shadow cursor-pointer hover:border-b-2 hover:border-blue-500 transition-all duration-300"
              onClick={() => window.open("https://forms.gle/yZFNThPASEWVLSN9A", "_blank")}
            >
              השלמת סקר שבועי (לחץ/י){" "}
              <FaCheckCircle className={isDone ? "text-green-500" : "text-yellow-500"} />
            </li>
          )}
        </ul>
        {isDone ? (
          <h2 className="text-green-500 text-lg mb-4 text-center font-bold">
            כל הכבוד! המשימות היומיות הושלמו
          </h2>
        ) : (
          <button
            onClick={completeDailyTasks}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full mb-4"
          >
            סמן כבוצע
          </button>
        )}
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded w-full"
        >
          סיום
        </button>
      </div>
    </div>
  );
  
  
}

export default UserDashboard;
