import React from 'react';

const AiModal = ({ isOpen, onClose, isLoading, content }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4 transition-opacity duration-300"
      onClick={onClose}
    >
      <div 
        className="bg-gray-100 dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-2xl transform transition-all duration-300 scale-100"
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside modal from closing it
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">AI-Powered Explanation</h3>
            <button 
              onClick={onClose} 
              className="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors text-2xl leading-none"
            >
              &times;
            </button>
          </div>
          
          <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed min-h-[150px]">
            {isLoading ? (
               <div className="flex items-center justify-center h-full pt-10">
                 <div className="w-8 h-8 rounded-full loading-spinner"></div>
               </div>
            ) : (
               <div dangerouslySetInnerHTML={{ __html: content }} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiModal;