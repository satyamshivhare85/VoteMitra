import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from "../Components/Navbar/Navbar.jsx";
import FaceVerification from "../Components/Voting/FaceVerification/FaceVerification.jsx";

import EVM from './Evm.jsx';

function Vote() {
  return (
    // 'flex flex-col' add kiya taaki height properly manage ho
    <div className="bg-gray-900 text-white min-h-screen overflow-hidden flex flex-col">
      <Navbar />
      {/* flex-grow add kiya taaki main content bachi hui jagah le le */}
      <main className="flex items-center justify-center flex-grow w-full p-4 pt-24">
        
        {/* Routing setup for Voting Flow */}
        <Routes>
          {/* Default view: Face Verification */}
          <Route path="/" element={<FaceVerification />} />
          
          {/* Secured view: Voting Booth */}
          <Route path="/booth" element={<EVM />} />
        </Routes>

      </main>
    </div>
  );
}

export default Vote;