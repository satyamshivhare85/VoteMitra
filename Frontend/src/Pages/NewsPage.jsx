import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import NewsCard from '../components/News/NewsCard';
import LiveSummary from "../Components/News/LiveSummary"
import AiModal from '../components/News/AiModal';

const GEMINI_API_KEY = "a987bfc521654e5b948c9bb8e3b3b01d";
const NEWS_API_KEY = "a987bfc521654e5b948c9bb8e3b3b01d";

const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${GEMINI_API_KEY}`;
const NEWS_API_URL = `https://newsapi.org/v2/everything?q=("indian election" OR "Lok Sabha")&language=en&sortBy=publishedAt&apiKey=${NEWS_API_KEY}`;

const NewsPage = () => {
  const [theme, setTheme] = useState('dark');
  const [news, setNews] = useState([]);
  const [isLoadingNews, setIsLoadingNews] = useState(true);
  const [error, setError] = useState(null);

  // Modal State
  const [modalState, setModalState] = useState({
    isOpen: false,
    isLoading: false,
    content: ''
  });

  // Initialize theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
  }, []);

  // Apply theme to document element
  useEffect(() => {
    const htmlElement = document.documentElement;
    if (theme === 'dark') {
      htmlElement.classList.add('dark');
      htmlElement.classList.remove('light');
    } else {
      htmlElement.classList.add('light');
      htmlElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // Fetch News
  const fetchNews = async () => {
    setIsLoadingNews(true);
    setError(null);
    try {
      const response = await fetch(NEWS_API_URL);
      if (!response.ok) throw new Error(`NewsAPI error: ${response.status}`);
      const data = await response.json();
      
      if (data.status === 'ok' && data.articles.length > 0) {
        // Filter out articles with '[Removed]' titles
        const validArticles = data.articles.filter(a => a.title && a.title !== '[Removed]');
        setNews(validArticles);
      } else {
        setError("Could not find any news articles. Please try again later.");
      }
    } catch (err) {
      console.error("Failed to fetch news:", err);
      setError("Failed to load news. Check the API key or network connection.");
    } finally {
      setIsLoadingNews(false);
    }
  };

  useEffect(() => {
    fetchNews();
    const interval = setInterval(fetchNews, 15 * 60 * 1000); // 15 mins
    return () => clearInterval(interval);
  }, []);

  // Fetch AI Explanation
  const handleExplain = async (headline, summaryText) => {
    setModalState({ isOpen: true, isLoading: true, content: '' });

    const systemPrompt = "You are a helpful news analyst. Explain the following news summary in simple terms, providing a little more context. Keep it concise and easy to understand.";
    const userQuery = `Headline: "${headline}"\n\nNews Summary: "${summaryText || 'No summary available.'}"\n\nExplain this to me.`;
    
    try {
      const response = await fetch(GEMINI_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: userQuery }] }],
          systemInstruction: { parts: [{ text: systemPrompt }] },
        })
      });
      
      if (!response.ok) throw new Error("API request failed");
      const result = await response.json();
      const summary = result.candidates?.[0]?.content?.parts?.[0]?.text;

      if (summary) {
        const formattedHtml = summary.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
        setModalState({ isOpen: true, isLoading: false, content: formattedHtml });
      } else {
        throw new Error("Invalid response structure");
      }
    } catch (err) {
      console.error("Gemini API call failed:", err);
      setModalState({ 
        isOpen: true, 
        isLoading: false, 
        content: `<p class="text-red-500">Sorry, I couldn't generate an explanation at this time. Please try again later.</p>` 
      });
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen transition-colors duration-500">
      <Navbar theme={theme} onToggleTheme={toggleTheme} />

      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 pt-24">
        
        {/* Page Sub-header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Here are some of the latest news</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-10">Stay informed with real-time election updates.</p>
        </div>

        {/* Main Content Grid */}
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* News Feed Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Real-Time Updates</h2>
              <div className="flex items-center space-x-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
                <span className="text-sm font-medium text-red-500">LIVE</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {isLoadingNews && <p className="col-span-1 md:col-span-2 text-center">Fetching live news...</p>}
              {error && <p className="col-span-1 md:col-span-2 text-center text-red-500">{error}</p>}
              
              {!isLoadingNews && !error && news.slice(0, 10).map((article, index) => (
                <NewsCard 
                  key={index} 
                  article={article} 
                  onExplain={handleExplain} 
                />
              ))}
            </div>
          </div>

          {/* Summary & Analysis Section */}
          <LiveSummary articles={news.slice(0, 5)} />

        </main>
        
        {/* Footer */}
        <footer className="text-center mt-12 py-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">&copy; 2026 Election News Hub. All Rights Reserved.</p>
        </footer>
      </div>

      <AiModal 
        isOpen={modalState.isOpen} 
        onClose={() => setModalState(prev => ({ ...prev, isOpen: false }))} 
        isLoading={modalState.isLoading}
        content={modalState.content}
      />
    </div>
  );
};

export default NewsPage;