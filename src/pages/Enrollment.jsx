import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Enrollment = () => { // Accept voter as a prop
  const [instruction, setInstruction] = useState('');
  const navigate = useNavigate();

  const location = useLocation();
  const voter = location.state?.voter; // Get voter data safely

  const enrollFingerprint = async () => {
    try {
      // Ensure voter is defined
      if (!voter || !voter.id) {
        throw new Error('Voter information is missing. Please log in again.');
      }

      // Display instructions to the user
      setInstruction("Please place your finger on the scanner...");

      // Fetch the challenge from the backend
      const response = await axios.post('https://votingjs-backend.onrender.com/generate-challenge', {
        voterId: voter.id
      });

      const challenge = Uint8Array.from(atob(response.data.challenge), c => c.charCodeAt(0));

      const publicKey = {
        challenge: challenge,
        rp: { name: "Voting Platform" },
        user: {
          id: Uint8Array.from(voter.id, c => c.charCodeAt(0)),
          name: voter.name,
          displayName: voter.name,
        },
        pubKeyCredParams: [{ type: "public-key", alg: -7 }],
        authenticatorSelection: {
          authenticatorAttachment: "platform",
          requireResidentKey: false,
          userVerification: "preferred"
        },
        timeout: 60000,
        attestation: "none",
      };

      // Wait for the fingerprint scan
      const credential = await navigator.credentials.create({ publicKey });

      // Send the fingerprint credential to the server for registration
      const enrollResponse = await axios.post('https://votingjs-backend.onrender.com/register-fingerprint', {
        userId: voter.id,
        attestation: credential
      });

      if (enrollResponse.data.success) {
        alert('Fingerprint enrollment successful!');
        navigate('/vote');
      } else {
        alert('Enrollment failed. Please try again.');
      }
    } catch (error) {
      console.error('Fingerprint enrollment failed:', error);
      alert(error.message || 'Fingerprint enrollment failed. Please try again.');
    } finally {
      setInstruction(""); // Clear the instruction once done
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Enroll Your Fingerprint</h1>
      <button onClick={enrollFingerprint} className="bg-green-500 text-white px-6 py-2 rounded">
        Start Enrollment
      </button>
      {instruction && <p className="mt-4 text-blue-500">{instruction}</p>} {/* Display instruction */}
    </div>
  );
};

export default Enrollment;
