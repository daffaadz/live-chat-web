import React, { useState } from "react";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      if (response.ok) {
        // Simpan token di localStorage
        localStorage.setItem("userToken", JSON.stringify(data.token)); // Simpan token
        setMessage("Registration successful! Redirecting...");
        window.location.href = "/"; // Arahkan ke dashboard
      } else {
        setMessage(data.message || "Registration failed");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };
  

  return (
    <div className="w-screen h-screen overflow-hidden flex justify-center items-center bg-gradient-to-tl from-green-400 to-blue-500">
      <div className="w-1/3 p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Register</h2>
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
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-black"
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
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-black"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white p-3 rounded-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300"
          >
            Register
          </button>
        </form>
        <p className="text-gray-600 text-center mt-6">
          Already have an account? <a href="/login" className="text-green-500 hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
