import { useState } from "react";
// import { useHistory } from "react-router-dom";
import axios from "axios";

import { Link, NavLink } from "react-router-dom";

function VoterDetails() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
    // const history = useHistory();

  const handleContinue = async () => {
    try {
      const response = await axios.post("http://localhost:5000/verify-voter", {
        name,
      });
      if (response.data.success) {
        // Pass the verified voter data to the next route
        history.push("/vote", { voter: response.data.voter });
      } else {
        setMessage("Verification failed");
      }
    } catch (error) {
      setMessage("Error verifying voter");
    }
  };

  return (
    <>
      <div className="flex justify-between bg-green-500 p-4 uppercase">
        <h1 className="text-xl font-bold text-white">E-Voting</h1>
        <ul className="flex items-center gap-4 font-bold text-white">
          <li>
            <NavLink to="/vote">Register</NavLink>
          </li>
          <li>
          <NavLink to="/vote">Login</NavLink>
          </li>
        </ul>
      </div>
      <div className="flex min-h-screen items-center justify-center">
        <div className="rounded-lg border border-white bg-white p-16 text-center drop-shadow-lg">
          <h1 className="mb-4 text-2xl font-bold text-green-500">
            Voter Details
          </h1>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded border border-green-300 p-2"
            />
          </div>
          {/* <button
            onClick={handleContinue}
            className="rounded bg-green-500 px-4 py-2 text-white"
          > */}
          <button
          
            className="rounded bg-green-500 px-4 py-2 text-white"
          >
            <Link to='/vote'>
            Login
            </Link>
          </button>

          {message && <p className="mt-4 text-red-500">{message}</p>}
        </div>
      </div>
    </>
  );
}

export default VoterDetails;
