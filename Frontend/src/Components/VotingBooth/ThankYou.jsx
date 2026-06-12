import React from "react";

const ThankYou = () => {
  return (
    <div className="text-center bg-gray-900 p-10 rounded-lg shadow-2xl border-2 border-green-500">
      <h2 className="text-4xl font-bold text-green-400 mb-4">
        Thank You For Voting!
      </h2>
      <p className="text-lg text-gray-300">
        We appreciate your effort to take a step in our democratic initiative.
      </p>
      <p className="text-sm mt-6 text-gray-500">
        This session will terminate automatically.
      </p>
    </div>
  );
};

export default ThankYou;