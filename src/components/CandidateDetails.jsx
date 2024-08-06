import React from "react";

function CandidateDetails({ candidate }) {
  return (
    <div className="text-center">
      <h1>{candidate.name}</h1>
      <h2>{candidate.party}</h2>
      <p>{candidate.details}</p>
    </div>
  );
}

export default CandidateDetails;
