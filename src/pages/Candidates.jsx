import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import BiometricScan from "../components/BiometricScan";
import CandidateDetails from "../components/CandidateDetails";
import Navbar2 from "../components/Navbar2";

function Candidates() {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const voter = location.state.voter;

  useEffect(() => {
    if (!voter) {
      alert('Voter data is missing. Please log in again.');
      navigate('/login');
      return;
    }
  }, [voter, navigate]);

  useEffect(() => {
    async function fetchCandidates() {
      const response = await axios.get("http://localhost:5000/candidates");
      setCandidates(response.data);
    }
    fetchCandidates();
  }, []);

  async function handleVote() {
    try {
      const biometricData = await BiometricScan();
      const response = await axios.post(
        "http://localhost:5000/biometric-vote",
        { voterId: voter.id, candidateId: selectedCandidate.id, biometricData },
      );
      if (response.data.success) {
        navigate("/results");
      } else {
        alert("You have already voted or biometric verification failed");
      }
    } catch (error) {
      alert("Error during voting");
    }
  }

  function handleCancel() {
    setPopupVisible(false);
    setSelectedCandidate(null);
  }

  return (
    <>
      <Navbar2 />
      <div className="flex min-h-screen items-center justify-center">
        <div className="rounded-lg border border-white bg-white p-10 text-center drop-shadow-lg">
          <h1 className="mb-4 text-2xl font-bold text-green-500">
            Select a Candidate
          </h1>
          <div className="grid grid-cols-2 gap-4">
            {candidates.map((candidate) => (
              <div
                key={candidate.id}
                className="flex items-center justify-between gap-4 rounded border p-4 shadow"
              >
                <div>
                  <h2 className="text-xl font-bold">{candidate.name}</h2>
                </div>
                <button
                  onClick={() => {
                    setSelectedCandidate(candidate);
                    setPopupVisible(true);
                  }}
                  className="rounded bg-green-500 px-4 py-2 text-white"
                >
                  Vote
                </button>
              </div>
            ))}
          </div>

          {popupVisible && selectedCandidate && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
              <div className="rounded-lg bg-white p-8 shadow-lg">
                <CandidateDetails candidate={selectedCandidate} />
                <div className="mt-4 flex justify-end gap-4">
                  <button
                    onClick={handleVote}
                    className="rounded bg-green-500 px-4 py-2 text-white"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={handleCancel}
                    className="rounded bg-red-500 px-4 py-2 text-white"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Candidates;
