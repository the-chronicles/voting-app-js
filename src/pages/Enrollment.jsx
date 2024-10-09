import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Enrollment({ voter }) {
  const navigate = useNavigate();
  const [instruction, setInstruction] = useState("");

  const enrollFingerprint = async () => {
    setInstruction("Please place your finger on the scanner.");
    try {
      // Fetch challenge from the backend
      const challengeResponse = await axios.post('http://localhost:5000/generate-challenge');
      const challenge = Uint8Array.from(atob(challengeResponse.data.challenge), c => c.charCodeAt(0));
  
      const publicKey = {
        challenge: challenge,
        rp: { name: "Voting Platform" },
        user: {
          id: new Uint8Array(16), // Generate a unique user ID, ensure it is unique for each user
          name: voter.name,
          displayName: voter.name,
        },
        pubKeyCredParams: [{ type: "public-key", alg: -7 }],
        authenticatorSelection: {
          authenticatorAttachment: "platform", // Using built-in device fingerprint
          requireResidentKey: false,
          userVerification: "preferred" // Optional: Ensure user verification is requested
        },
        timeout: 60000,
        attestation: "none",
      };
  
      // Wait for the user to place their finger on the scanner
      const credential = await navigator.credentials.create({ publicKey });
  
      // Send the credential to the backend to store for future authentication
      await axios.post('http://localhost:5000/enroll-fingerprint', { credential, voterId: voter.id });
  
      alert('Fingerprint enrollment successful!');
      navigate('/vote');
    } catch (error) {
      console.error('Error during fingerprint enrollment:', error);
      alert('Fingerprint enrollment failed. Please try again.');
    } finally {
      setInstruction(""); // Clear instruction after the process
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
}

export default Enrollment;
