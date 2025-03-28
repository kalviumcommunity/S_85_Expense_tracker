import { useState, useEffect } from "react";
import axios from "axios";

function Login() {
  const [formData, setFormData] = useState({ name: "", email: "", age: "", password: "" });
  const [submittedData, setSubmittedData] = useState([]);
  const [message, setMessage] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post("http://localhost:3000/api/user/form", formData, {
        headers: { "Content-Type": "application/json" },
      });

      setSubmittedData([...submittedData, res.data]); // Update UI
      setFormData({ name: "", email: "", age: "", password: "" }); // Reset form
      setMessage("Successfully Submitted!");
    } catch (error) {
      console.error(" Error saving data:", error.response?.data || error);
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

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-center">Register</h2>

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
          Register
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
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Login;
