import React, { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      if (response.ok) {
        // Simpan status login di localStorage
        localStorage.setItem("userToken", JSON.stringify(data.token)); // Contoh: token dari backend
        setMessage("Login successful!");
        window.location.href = "/"; // Arahkan ke halaman dashboard
      } else {
        setMessage(data.message || "Login failed");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };
  

  return (
    <div className="w-screen h-screen overflow-hidden flex justify-center items-center bg-gradient-to-br from-3 to-4">
      <div className="md:w-1/3 min-w-72 p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
        {message && <p className="text-center text-red-500 mb-4">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-left font-medium mb-2 ml-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-left font-medium mb-2 ml-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-3 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300"
          >
            Login
          </button>
        </form>
        <p className="text-gray-600 text-center mt-6">
          Don't have an account? <a href="/register" className="text-indigo-500 hover:underline cursor-pointer">Register</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;