import React from 'react';

function ResultOverlay({ resultState }) {
  const { isVisible, isSuccess, data } = resultState;

  return (
    <div 
      className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-500 ${isVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} ${isSuccess ? 'bg-green-800/95' : 'bg-red-800/95'}`}
    >
      <div className={`text-center text-white absolute top-1/2 left-1/2 ${isVisible ? 'animate-pop-in' : 'opacity-0'}`}>
        <div className="relative inline-block mb-4">
          
          {/* Aadhar Number Tab (Hidden on failure) */}
          <div className={`absolute -top-7 left-1/2 -translate-x-1/2 px-8 py-2 rounded-t-lg shadow-lg border-2 border-b-0 ${isSuccess ? 'bg-green-600 border-green-400' : 'hidden bg-red-600 border-red-400'}`}>
            <span className="text-2xl font-black tracking-widest text-white">
              {data.aadhar || ''}
            </span>
          </div>

          {/* Result Box */}
          <div className={`px-16 py-8 rounded-lg shadow-2xl border-2 ${isSuccess ? 'bg-green-700 border-green-500' : 'bg-red-700 border-red-500'}`}>
            <p className="text-5xl font-extrabold tracking-wider">
              {isSuccess ? 'VERIFIED' : 'NOT VERIFIED'}
            </p>
          </div>

        </div>
        
        <p className="text-xl mt-4 font-semibold">
          {isSuccess ? 'You can now cast your vote.' : (data.message || 'Face not matched. Access denied.')}
        </p>
      </div>
    </div>
  );
}

export default ResultOverlay;