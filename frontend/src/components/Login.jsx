import { useState } from "react";
import axios from "axios";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post("http://localhost:3000/api/user/login", formData, {
        headers: { "Content-Type": "application/json" },
      });

      setMessage("Login successful!",res.data);
      console.log("User:", res.data); // You can handle token or redirect here
    } catch (error) {
      console.error("Login error:", error.response?.data || error);
      setMessage(`Error: ${error.response?.data?.message || "Invalid credentials"}`);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-center">Login</h2>

      <form onSubmit={handleLogin} className="space-y-3">
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
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">
          Login
        </button>
      </form>

      {message && <p className="text-center font-bold">{message}</p>}
    </div>
  );
}

export default Login;
