import { BrowserRouter, Route, Routes } from "react-router-dom";
import VoterDetails from "./components/VoterDetails";
import Vote from "./components/Vote";



function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route index element={<VoterDetails />} />
      <Route path="/vote" element={<Vote />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
