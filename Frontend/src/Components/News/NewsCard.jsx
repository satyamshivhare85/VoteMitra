import React from 'react';

const NewsCard = ({ article, onExplain }) => {
  const imageUrl = article.urlToImage || `https://placehold.co/600x400/666/ffffff?text=Image+Not+Available`;

  return (
    <article className="bg-white dark:bg-slate-800 flex flex-col overflow-hidden rounded-xl shadow-lg border border-gray-200 dark:border-gray-700/60 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-fade-in">
      <img 
        src={imageUrl} 
        onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/999/ffffff?text=Image+Error'; }} 
        alt={`News image for ${article.title}`} 
        className="w-full h-40 object-cover"
      />
      <div className="p-5 flex flex-col flex-grow">
        <span className="text-sm font-semibold text-blue-500 dark:text-blue-400 mb-1">
          {article.source.name}
        </span>
        <h3 className="text-md font-bold mb-2 text-gray-900 dark:text-white flex-grow">
          {article.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-xs leading-relaxed mb-4 line-clamp-3">
          {article.description || ''}
        </p>
        <div className="mt-auto flex items-center justify-between text-xs font-medium">
          <a 
            href={article.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-500 dark:text-blue-400 hover:underline"
          >
            Read More &rarr;
          </a>
          <button 
            onClick={() => onExplain(article.title, article.description)}
            className="flex items-center space-x-1 text-purple-500 dark:text-purple-400 hover:underline focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            <span>Explain</span>
          </button>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;