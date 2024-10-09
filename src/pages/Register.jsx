import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Register() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  async function handleRegister() {
    try {
      // const response = await axios.post("http://localhost:5000/register", {
      const response = await axios.post("https://votingjs-backend.onrender.com/register", {
        name,
        age,
      });
      if (response.data.success) {
        navigate("/login");
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      setMessage("Error during registration");
    }
  }

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen items-center justify-center">
        <div className="rounded-lg border border-white bg-white p-16 text-center drop-shadow-lg">
          <h1 className="mb-4 text-2xl font-bold text-green-500">Register</h1>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded border border-green-300 p-2"
            />
          </div>
          <div className="mb-4">
            <input
              type="number"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="rounded border border-green-300 p-2"
            />
          </div>
          <button
            onClick={handleRegister}
            className="rounded bg-green-500 px-4 py-2 text-white"
          >
            Register
          </button>
          {message && <p className="mt-4 text-red-500">{message}</p>}
        </div>
      </div>
    </>
  );
}

export default Register;
