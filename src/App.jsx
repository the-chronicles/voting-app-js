import { BrowserRouter, Route, Routes } from "react-router-dom";
import VoterDetails from "./pages/VoterDetails";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Candidates from "./pages/Candidates";
import Result from "./pages/Result";



function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/vdetails" element={<VoterDetails />} />
      <Route path="/candidates" element={<Candidates />} />
      <Route path="/result" element={<Result />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
