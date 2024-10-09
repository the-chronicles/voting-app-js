import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Login() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  async function handleLogin() {
    try {
      const response = await axios.post("https://votingjs-backend.onrender.com/login", {
        name,
      });
      if (response.data.success) {
        navigate("/enroll", { state: { voter: response.data.voter } });
        // navigate("/vdetails", { state: { voter: response.data.voter } });
      } else {
        setMessage("Login failed");
      }
    } catch (error) {
      setMessage("Error during login");
    }
  }

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen items-center justify-center">
        <div className="rounded-lg border border-white bg-white p-16 text-center drop-shadow-lg">
          <h1 className="mb-4 text-2xl font-bold text-green-500">Login</h1>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded border border-green-300 p-2"
            />
          </div>
          <button
            onClick={handleLogin}
            className="rounded bg-green-500 px-4 py-2 text-white"
          >
            Login
          </button>
          {message && <p className="mt-4 text-red-500">{message}</p>}
        </div>
      </div>
    </>
  );
}

export default Login;
