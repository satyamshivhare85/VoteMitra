import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Menu, X } from 'lucide-react';
import Navbar from '../Components/Navbar/Navbar';

const ComplaintForm = () => {
  const [complaint, setComplaint] = useState('');
  const [status, setStatus] = useState({ message: '', type: '' });
  const [userLocation, setUserLocation] = useState('Detecting location...');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [typewriterText, setTypewriterText] = useState('');

  // --- Constants ---
  const phrases = [
    "Participate in fair voting.",
    "Your complaint ensures transparency.",
    "Every voice matters for democracy.",
    "Help us ensure safe elections."
  ];

  const slides = [
    { emoji: "🤝", title: "Welcome", desc: "Your voice matters. Share feedback to help us create a better workplace." },
    { emoji: "📝", title: "Submit Your Complaint", desc: "Easily report concerns, ensuring your voice is heard promptly." },
    { emoji: "🔒", title: "Completely Anonymous", desc: "Your identity is protected. We never store personal information." }
  ];

  // --- Typewriter Effect ---
  useEffect(() => {
    let phraseIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let timeout;

    const type = () => {
      const currentPhrase = phrases[phraseIdx];
      
      if (!isDeleting) {
        setTypewriterText(currentPhrase.substring(0, charIdx + 1));
        charIdx++;
        if (charIdx === currentPhrase.length) {
          isDeleting = true;
          timeout = setTimeout(type, 2000);
          return;
        }
      } else {
        setTypewriterText(currentPhrase.substring(0, charIdx - 1));
        charIdx--;
        if (charIdx === 0) {
          isDeleting = false;
          phraseIdx = (phraseIdx + 1) % phrases.length;
        }
      }
      timeout = setTimeout(type, isDeleting ? 75 : 150);
    };

    type();
    return () => clearTimeout(timeout);
  }, []);

  // --- Carousel Auto-Play ---
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // --- Geolocation ---
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserLocation(`Near Booth (${pos.coords.latitude.toFixed(3)}, ${pos.coords.longitude.toFixed(3)})`),
        () => setUserLocation("Location unavailable")
      );
    }
  }, []);

  // --- Form Submission ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!complaint.trim()) return;

    setStatus({ message: 'Submitting...', type: 'loading' });

    try {
      const payload = {
        text: complaint,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        date: new Date().toLocaleDateString(),
        location: userLocation
      };

      const res = await axios.post('http://localhost:8000/api/complaint', payload);
      
      setStatus({ message: res.data.message, type: 'success' });
      setComplaint('');
    } catch (err) {
      setStatus({ message: 'Submission failed. Check backend connection.', type: 'error' });
    }
  };

  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen font-sans">
      {/* Navigation */}
      {/* <header className="fixed top-0 w-full z-50 bg-gray-900/70 backdrop-blur-md border-b border-white/10">
        <nav className="container mx-auto flex items-center justify-between px-6 py-3">
          <img src="/logo2.png" className="h-12" alt="Logo" />
          
          <div className="hidden md:flex space-x-6 text-sm font-medium">
            {['Home', 'About', 'Registration', 'Map', 'News'].map((item) => (
              <a key={item} href="#" className="hover:text-indigo-400 transition-colors">{item}</a>
            ))}
            <a href="#" className="text-indigo-400 font-bold">Complaint</a>
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </nav>
      </header> */}
      <Navbar />

      <main className="pt-20">
        {/* Carousel */}
        <div className="relative overflow-hidden bg-gray-800 h-64 flex items-center">
          <div 
            className="flex transition-transform duration-500 ease-in-out w-full"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide, i) => (
              <div key={i} className="min-w-full text-center p-8">
                <div className="text-5xl mb-4">{slide.emoji}</div>
                <h2 className="text-xl font-bold mb-2">{slide.title}</h2>
                <p className="text-gray-400 max-w-md mx-auto text-sm">{slide.desc}</p>
              </div>
            ))}
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {slides.map((_, i) => (
              <div key={i} className={`h-2 w-2 rounded-full ${currentSlide === i ? 'bg-white' : 'bg-white/30'}`} />
            ))}
          </div>
        </div>

        {/* Typewriter Section */}
        <div className="bg-black py-6 text-center border-y-4 border-transparent" style={{ borderImage: 'linear-gradient(to right, #FF9933, white, #138808) 1' }}>
          <p className="text-lg font-semibold h-8">
            {typewriterText}<span className="text-orange-500 animate-pulse">|</span>
          </p>
        </div>

        {/* Form Section */}
        <div className="max-w-lg mx-auto p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-green-500 bg-clip-text text-transparent">
              Voice Your Concern
            </h1>
            <p className="text-xs text-gray-500 mt-2">Identity protected. Location logged for nearest booth.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <textarea
              value={complaint}
              onChange={(e) => setComplaint(e.target.value)}
              className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-all"
              rows="5"
              placeholder="Describe the issue in detail..."
              required
            />
            <button
              type="submit"
              className="w-full py-3 rounded-lg font-bold bg-gradient-to-r from-orange-600 to-green-600 hover:scale-[1.02] active:scale-95 transition-all shadow-lg"
            >
              Submit Anonymously
            </button>
          </form>

          {status.message && (
            <p className={`text-center mt-4 text-sm font-medium ${
              status.type === 'success' ? 'text-green-500' : 
              status.type === 'loading' ? 'text-orange-400' : 'text-red-500'
            }`}>
              {status.message}
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default ComplaintForm;