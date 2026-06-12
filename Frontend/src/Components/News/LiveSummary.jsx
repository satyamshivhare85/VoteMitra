import React from 'react';

const LiveSummary = ({ articles }) => {
  return (
    <aside className="lg:col-span-1">
      <div className="sticky top-24">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Live Summary</h2>
        <div className="bg-white dark:bg-gray-800/50 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <ul className="space-y-4 text-sm">
            {articles.length === 0 && (
              <p className="text-gray-500 dark:text-gray-400">Loading summary...</p>
            )}
            {articles.map((article, index) => (
              <li key={index} className="flex items-start animate-slide-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <svg className="w-4 h-4 mr-3 mt-1 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                <span className="text-gray-600 dark:text-gray-300">{article.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default LiveSummary;