import { useLocation, useNavigate } from "react-router-dom";
import Navbar2 from "../components/Navbar2";

function VoterDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const voter = location.state?.voter;

  if (!voter) {
    alert("Voter data is missing. Please log in again.");
    navigate("/login");
    return null;
  }

  const handleContinue = () => {
    navigate("/candidates", { state: { voter } });
  };

  return (
    <>
      <Navbar2 />
      <div className="flex min-h-screen items-center justify-center">
        <div className="rounded-lg border border-white bg-white p-16 text-center drop-shadow-lg">
          <h1 className="mb-4 text-2xl font-bold text-green-500">
            Voter Details
          </h1>
          <div>{/* <img src="path/to/voter/image.jpg" alt="Voter" /> */}</div>
          <div className="mb-4">
            <h2>{voter.name}</h2>
            <p>Voter ID: {voter.id}</p>
            <p>You are eligible to vote</p>
          </div>
          <button
            onClick={handleContinue}
            className="rounded bg-green-500 px-4 py-2 text-white"
          >
            Continue
          </button>
        </div>
      </div>
    </>
  );
}

export default VoterDetails;
