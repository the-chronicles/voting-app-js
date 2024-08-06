import React from "react";
import { NavLink } from "react-router-dom";

function Navbar2() {
  return (
    <div className="flex justify-between bg-green-500 p-4 uppercase">
      <h1 className="text-xl font-bold text-white">E-Voting</h1>
      <ul className="flex items-center gap-4 font-bold text-white">
        <li>
          <NavLink to="/login">Logout</NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Navbar2;
