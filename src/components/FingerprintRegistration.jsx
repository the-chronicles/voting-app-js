import React from 'react';
import axios from 'axios';

const FingerprintRegistration = ({ voter }) => {
  const registerFingerprint = async () => {
    try {

        const challengeResponse = await axios.post('http://localhost:5000/generate-challenge');
    const challenge = Uint8Array.from(atob(challengeResponse.data.challenge), c => c.charCodeAt(0));

      const publicKey = {
          challenge: challenge, // Dummy challenge, replace with real server challenge
        //   challenge: new Uint8Array(32), // Dummy challenge, replace with real server challenge
          rp: {
          name: "Voting Platform",
        },
        user: {
          id: new Uint8Array(16),
          name: voter.name,
          displayName: voter.name,
        },
        pubKeyCredParams: [{ type: "public-key", alg: -7 }],
        authenticatorSelection: {
          authenticatorAttachment: "platform",
        },
        timeout: 60000,
        attestation: "none",
      };

      const credential = await navigator.credentials.create({ publicKey });
      const attestation = {
        id: credential.id,
        rawId: credential.rawId,
        type: credential.type,
        response: {
          attestationObject: credential.response.attestationObject,
          clientDataJSON: credential.response.clientDataJSON,
        },
      };

      const response = await axios.post('https://votingjs-backend.onrender.com/register-fingerprint', {
        userId: voter.id,
        attestation,
      });

      if (response.data.success) {
        alert("Fingerprint registered successfully!");
      } else {
        alert("Fingerprint registration failed.");
      }
    } catch (error) {
      console.error("Error during fingerprint registration:", error);
      alert("Fingerprint registration failed.");
    }
  };

  return (
    <div>
      <h2>Register Fingerprint</h2>
      <button onClick={registerFingerprint}>Register Fingerprint</button>
    </div>
  );
};

export default FingerprintRegistration;
