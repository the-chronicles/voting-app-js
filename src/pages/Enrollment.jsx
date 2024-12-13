import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Enrollment = () => {
  const [instruction, setInstruction] = useState("");
  const [loading, setLoading] = useState(false); // Track loading state
  const navigate = useNavigate();
  const location = useLocation();
  const voter = location.state?.voter; // Safely retrieve voter data

  const enrollFingerprint = async () => {
    try {
      if (!voter || !voter.id) {
        throw new Error("Voter information is missing. Please log in again.");
      }

      setLoading(true); // Start loading
      setInstruction("Please place your finger on the scanner...");

      const response = await axios.post(
        "https://votingjs-backend.onrender.com/generate-challenge",
        {
          voterId: voter.id,
        },
      );
      const challenge = Uint8Array.from(atob(response.data.challenge), (c) =>
        c.charCodeAt(0),
      );

      const publicKey = {
        challenge,
        rp: { name: "Voting Platform" },
        user: {
          id: Uint8Array.from(voter.id, (c) => c.charCodeAt(0)),
          name: voter.name,
          displayName: voter.name,
        },
        pubKeyCredParams: [{ type: "public-key", alg: -7 }],
        authenticatorSelection: {
          authenticatorAttachment: "platform",
          requireResidentKey: false,
          userVerification: "preferred",
        },
        timeout: 60000,
        attestation: "none",
      };

      const credential = await navigator.credentials.create({ publicKey });

      const enrollResponse = await axios.post(
        "https://votingjs-backend.onrender.com/register-fingerprint",
        {
          userId: voter.id,
          attestation: credential,
        },
      );

      if (enrollResponse.data.success) {
        alert("Fingerprint enrollment successful!");
        navigate("/vdetails");
      } else {
        alert("Enrollment failed. Please try again.");
      }
    } catch (error) {
      console.error("Fingerprint enrollment failed:", error);
      alert(
        error.message || "Fingerprint enrollment failed. Please try again.",
      );
    } finally {
      setInstruction("");
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="mb-6 text-2xl font-bold">Enroll Your Fingerprint</h1>
      <button
        onClick={enrollFingerprint}
        disabled={loading} // Disable button when loading
        className={`rounded bg-green-500 px-6 py-2 text-white ${loading && "cursor-not-allowed opacity-50"}`}
      >
        {loading ? "Enrolling..." : "Start Enrollment"}
      </button>
      {instruction && <p className="mt-4 text-blue-500">{instruction}</p>}
    </div>
  );
};

export default Enrollment;
