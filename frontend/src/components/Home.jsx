
import React, { useEffect, useState } from "react";

const HomePage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/user/user");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-200 p-8">
      <h1 className="text-4xl font-extrabold text-center text-purple-700 mb-10">
        User Directory
      </h1>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <div
            key={user._id}
            className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-2">{user.name}</h2>
            <p className="text-gray-600">
              <strong>Age:</strong> {user.age}
            </p>
            <p className="text-gray-600">
              <strong>Email:</strong> {user.email}
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Created on: {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
