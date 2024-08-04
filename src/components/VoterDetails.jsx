// import { useState } from "react";
// import { useHistory } from "react-router-dom";
// import axios from "axios";

import { Link } from "react-router-dom";


function VoterDetails() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
//   const history = useHistory();

// const handleContinue = async () => {
//     try {
//         const response = await axios.post('http://localhost:5000/verify-voter', { name });
//         if (response.data.success) {
//             // Pass the verified voter data to the next route
//             history.push('/vote', { voter: response.data.voter });
//         } else {
//             setMessage('Verification failed');
//         }
//     } catch (error) {
//         setMessage('Error verifying voter');
//     }
// };



  return (<div style={{ textAlign: 'center', marginTop: '50px' }}>
  <h1>Voter Details</h1>
  <div>
      <input 
          type="text" 
          placeholder="Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
      />
  </div>
  <Link to='/vote'>
  {/* <button onClick={handleContinue}> */}
  <button>
    Continue</button>
  </Link>
  {message && <p>{message}</p>}
</div>
  )
}

export default VoterDetails;
