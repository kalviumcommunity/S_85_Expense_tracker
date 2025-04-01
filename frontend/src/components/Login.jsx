import { useState, useEffect } from "react";
import axios from "axios";

function Login() {
  const [formData, setFormData] = useState({ name: "", email: "", age: "", password: "" });
  const [submittedData, setSubmittedData] = useState([]);
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission (for both Add and Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      let res;
      if (isEditing) {
        // Update user
        res = await axios.put(`http://localhost:3000/api/user/user/${editingUser._id}`, formData, {
          headers: { "Content-Type": "application/json" },
        });
        setSubmittedData(
          submittedData.map((user) =>
            user._id === editingUser._id ? { ...user, ...formData } : user
          )
        );
        setIsEditing(false);
        setEditingUser(null);
        setMessage("Successfully Updated!");
      } else {
        // Add new user
        res = await axios.post("http://localhost:3000/api/user/user", formData, {
          headers: { "Content-Type": "application/json" },
        });
        setSubmittedData([...submittedData, res.data]);
        setMessage("Successfully Submitted!");
      }

      setFormData({ name: "", email: "", age: "", password: "" }); // Reset form
    } catch (error) {
      console.error("Error saving data:", error.response?.data || error);
      setMessage(`Error: ${error.response?.data?.message || "Server error"}`);
    }
  };

  // Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/user/form");
        setSubmittedData(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/user/user/${id}`);
      setSubmittedData(submittedData.filter((user) => user._id !== id));
      setMessage("Successfully Deleted!");
    } catch (error) {
      console.error("Error deleting data:", error);
      setMessage("Error: Could not delete user.");
    }
  };

  // Handle edit
  const handleEdit = (user) => {
    setFormData({ name: user.name, email: user.email, age: user.age, password: user.password });
    setIsEditing(true);
    setEditingUser(user);
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-center">{isEditing ? "Edit User" : "Register"}</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="number"
          name="age"
          placeholder="Enter Age"
          value={formData.age}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          {isEditing ? "Update" : "Register"}
        </button>
      </form>

      {/* Display Messages */}
      {message && <p className="text-center font-bold">{message}</p>}

      {/* Display Stored Data */}
      <h3 className="text-xl font-bold">Stored Users:</h3>
      <ul className="bg-gray-100 p-4 rounded">
        {submittedData.map((user) => (
          <li key={user._id} className="mb-2 border-b pb-2">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Age:</strong> {user.age}</p>

            <div className="flex justify-between mt-2">
              <button
                onClick={() => handleEdit(user)}
                className="bg-yellow-500 text-white p-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(user._id)}
                className="bg-red-500 text-white p-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Login;
