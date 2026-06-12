import React from 'react';
import { 
  ShieldCheck, 
  Camera, 
  Fingerprint, 
  Vote, 
  MessageSquareWarning, 
  Activity,
  Database,
  Lock,
  UserCheck,
  Trophy,
  Star,
  Zap
} from 'lucide-react';

import Navbar from "../Components/Navbar/Navbar";
import techVrikshaImg from "../assets/TechVrisksha.jpeg";

export default function About() {
  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-[#0a0f16] text-gray-200 font-sans selection:bg-[#FF9933] selection:text-white overflow-hidden">
        
        {/* Background Glow Effects (Tiranga) */}
        <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-[#FF9933]/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"></div>
        <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-[#138808]/10 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2 pointer-events-none z-0"></div>

        {/* TechVriksha Top Banner */}
        <div className="relative z-50 bg-gradient-to-r from-[#FF9933] via-white to-[#138808] p-1 shadow-lg">
          
        </div>

        {/* FULL SCREEN Hero Section */}
        <header className="relative min-h-[calc(100vh-60px)] flex items-center justify-center border-b border-gray-800/50 overflow-hidden">
          
          {/* Full Screen Background Image */}
          <div className="absolute inset-0 w-full h-full z-0">
            <img 
              src={techVrikshaImg} 
              alt="VoteMitra Background" 
              className="w-full h-full object-cover object-center opacity-40 mix-blend-luminosity transform scale-105 animate-[pulse_10s_ease-in-out_infinite_alternate]"
              onError={(e) => {
                e.target.onerror = null; 
                e.target.src = "https://images.unsplash.com/photo-1555848962-6e79363ec58f?q=80&w=2000&auto=format&fit=crop"; // Better fallback for full screen
              }}
            />
            {/* Gradient Overlays for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f16]/30 via-[#0a0f16]/60 to-[#0a0f16]"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f16]/80 via-transparent to-[#0a0f16]/80"></div>
          </div>

          {/* Hero Content with Centered Glow */}
          <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12 text-center mt-12 group">
            {/* Inner Background Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF9933]/20 via-white/10 to-[#138808]/20 blur-3xl rounded-3xl pointer-events-none transition-opacity duration-700 opacity-70 group-hover:opacity-100"></div>
            
            <div className="relative space-y-8">
              <div className="inline-block px-6 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-4 shadow-2xl">
                <span className="text-[#FF9933] font-semibold tracking-wider uppercase text-sm">Welcome to the Future</span>
              </div>
              
              <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight drop-shadow-2xl">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9933] via-white to-[#138808]">
                  VoteMitra
                </span>
              </h1>
              <p className="text-xl md:text-3xl font-light text-gray-200 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
                A next-generation, AI-powered Smart Voting System designed to bring absolute transparency, security, and accessibility to the democratic process.
              </p>
            </div>
          </div>
        </header>

        {/* TechVriksha Pitch Section */}
        <section className="py-12 px-6 lg:px-12 max-w-6xl mx-auto relative z-10 -mt-20">
          <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-gray-700/50 p-8 md:p-12 rounded-3xl shadow-2xl relative overflow-hidden group hover:border-[#FF9933]/50 transition-colors duration-500">
            
            {/* Subtle Ashoka Chakra Watermark */}
            <div className="absolute -right-20 -top-20 opacity-5 group-hover:opacity-10 group-hover:rotate-45 transition-all duration-1000 pointer-events-none">
              <div className="w-96 h-96 border-[16px] border-blue-600 rounded-full flex items-center justify-center">
                {[...Array(24)].map((_, i) => (
                  <div key={i} className="absolute w-1 h-48 bg-blue-600 origin-bottom" style={{ transform: `rotate(${i * 15}deg) translateY(-50%)` }}></div>
                ))}
              </div>
            </div>

            <div className="relative z-10 text-center md:text-left flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1 space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3 justify-center md:justify-start">
                  <Star className="text-yellow-400 w-8 h-8 fill-yellow-400" />
                  Why VoteMitra Wins TechVriksha
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                  We aren't just solving a technical problem; we are securing the foundation of democracy. By combining <strong>Real-time AI Facial Recognition</strong>, <strong>Cryptographic Aadhar Hashing</strong>, and a robust <strong>Anti-Spoofing Engine</strong>, VoteMitra ensures zero booth capturing, zero duplicate votes, and 100% transparent elections.
                </p>
              </div>
              <div className="flex-shrink-0 grid grid-cols-2 gap-4">
                <div className="bg-gray-900/80 p-4 rounded-xl border border-[#FF9933]/30 flex flex-col items-center">
                  <Zap className="text-[#FF9933] w-6 h-6 mb-2" />
                  <span className="font-bold text-white">Real-Time</span>
                </div>
                <div className="bg-gray-900/80 p-4 rounded-xl border border-[#138808]/30 flex flex-col items-center">
                  <ShieldCheck className="text-[#138808] w-6 h-6 mb-2" />
                  <span className="font-bold text-white">Tamper-Proof</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features Section */}
        <section className="py-16 px-6 lg:px-12 max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Core Capabilities</h2>
            <div className="w-32 h-1 bg-gradient-to-r from-[#FF9933] via-white to-[#138808] mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              color="#FF9933"
              icon={<Fingerprint className="w-8 h-8 text-[#FF9933]" />}
              title="Aadhar-Linked Registration"
              description="Voters are authenticated via a strict 12-digit Aadhar validation. Aadhar data is cryptographically hashed to ensure absolute privacy."
            />
            <FeatureCard 
              color="#FFFFFF"
              icon={<Camera className="w-8 h-8 text-white" />}
              title="Facial Recognition AI"
              description="Captures a 50-frame dataset using face-api.js, generating 128-dimensional facial embeddings for high-precision, sub-second matching."
            />
            <FeatureCard 
              color="#138808"
              icon={<Activity className="w-8 h-8 text-[#138808]" />}
              title="Anti-Spoofing Liveness"
              description="Defeats photo/video spoofing through an interactive AI liveness test requiring users to mimic randomized head movements in real-time."
            />
            <FeatureCard 
              color="#000080"
              icon={<Vote className="w-8 h-8 text-blue-400" />}
              title="Frictionless E-Voting"
              description="Utilizes a strict 0.45 distance threshold to grant access. The system instantly detects faces and strictly prevents double-voting."
            />
            <FeatureCard 
              color="#FF9933"
              icon={<MessageSquareWarning className="w-8 h-8 text-[#FF9933]" />}
              title="Anonymous Grievances"
              description="A secure portal allowing citizens to report electoral malpractice or coercion entirely anonymously without revealing their identity."
            />
            <FeatureCard 
              color="#138808"
              icon={<ShieldCheck className="w-8 h-8 text-[#138808]" />}
              title="Encrypted Vault"
              description="Votes and user statuses are updated atomically using secure JWT session tokens, ensuring the vote ledger remains tamper-proof."
            />
          </div>
        </section>

        {/* Interactive System Flowchart Section */}
        <section className="py-20 px-6 lg:px-12 bg-gray-900 border-t border-b border-gray-800/50 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-3xl font-bold text-white mb-4">System Architecture & Flow</h2>
              <p className="text-gray-400">Hover over each step to see how VoteMitra secures the democratic process</p>
            </div>

            <div className="relative flex flex-col items-center">
              {/* Flowchart Track (Tiranga Gradient) */}
              <div className="absolute left-1/2 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#FF9933] via-white to-[#138808] -translate-x-1/2 hidden lg:block rounded-full opacity-30"></div>

              <div className="space-y-16 w-full">
                <FlowStep 
                  number="1"
                  title="Registration & Identity Binding"
                  icon={<UserCheck />}
                  align="left"
                  color="from-[#FF9933]"
                >
                  <ul className="list-disc list-inside text-sm text-gray-400 space-y-2 mt-3 group-hover:text-gray-200 transition-colors">
                    <li>User inputs 12-digit Aadhar.</li>
                    <li>Real-time AI Liveness Check triggered.</li>
                    <li>System captures 50 valid face frames.</li>
                    <li>Aadhar hashed, embeddings saved to MongoDB.</li>
                  </ul>
                </FlowStep>

                <FlowStep 
                  number="2"
                  title="Pre-Voting Verification"
                  icon={<Camera />}
                  align="right"
                  color="from-[#FF9933]"
                >
                  <ul className="list-disc list-inside text-sm text-gray-400 space-y-2 mt-3 group-hover:text-gray-200 transition-colors">
                    <li>User approaches the voting portal.</li>
                    <li>Secondary interactive Liveness test.</li>
                    <li>Live face matched against Database.</li>
                    <li>Access granted only if distance &lt; 0.45.</li>
                  </ul>
                </FlowStep>

                <FlowStep 
                  number="3"
                  title="Token Generation & Access"
                  icon={<Lock />}
                  align="left"
                  color="from-white"
                  textColor="text-white"
                >
                  <ul className="list-disc list-inside text-sm text-gray-400 space-y-2 mt-3 group-hover:text-gray-200 transition-colors">
                    <li>System verifies <code className="bg-gray-900 px-1.5 py-0.5 rounded text-blue-300 border border-gray-700">hasVoted</code> flag.</li>
                    <li>If false, a secure JWT token is generated.</li>
                    <li>User securely redirected to the Digital Booth.</li>
                  </ul>
                </FlowStep>

                <FlowStep 
                  number="4"
                  title="Casting the Vote"
                  icon={<Database />}
                  align="right"
                  color="from-[#138808]"
                >
                  <ul className="list-disc list-inside text-sm text-gray-400 space-y-2 mt-3 group-hover:text-gray-200 transition-colors">
                    <li>User selects political party.</li>
                    <li>New atomic document in <code className="bg-gray-900 px-1.5 py-0.5 rounded text-blue-300 border border-gray-700">Vote</code> collection.</li>
                    <li>Flag set to true with strict timestamp.</li>
                    <li>Session instantly terminated.</li>
                  </ul>
                </FlowStep>

                <FlowStep 
                  number="5"
                  title="Anonymous Grievance"
                  icon={<MessageSquareWarning />}
                  align="left"
                  color="from-[#138808]"
                  isLast={true}
                >
                  <ul className="list-disc list-inside text-sm text-gray-400 space-y-2 mt-3 group-hover:text-gray-200 transition-colors">
                    <li>Independent reporting portal.</li>
                    <li>Requires no Aadhar or facial verification.</li>
                    <li>Submits critical feedback safely to authorities.</li>
                  </ul>
                </FlowStep>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 lg:px-12 text-center bg-[#0a0f16] border-t border-gray-800 relative z-10">
          <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF9933] via-white to-[#138808] mb-6">
            Powered By
          </h3>
          <div className="flex flex-wrap justify-center gap-4 text-sm font-medium text-gray-300">
            <span className="px-4 py-2 bg-gray-900 rounded-full shadow-sm border border-gray-800 hover:border-[#FF9933] transition-colors cursor-default">React.js</span>
            <span className="px-4 py-2 bg-gray-900 rounded-full shadow-sm border border-gray-800 hover:border-white transition-colors cursor-default">Face-API.js</span>
            <span className="px-4 py-2 bg-gray-900 rounded-full shadow-sm border border-gray-800 hover:border-[#138808] transition-colors cursor-default">Node.js / Express</span>
            <span className="px-4 py-2 bg-gray-900 rounded-full shadow-sm border border-gray-800 hover:border-blue-500 transition-colors cursor-default">MongoDB / Mongoose</span>
          </div>
          <p className="mt-10 text-sm text-gray-500">
            © {new Date().getFullYear()} VoteMitra. Jai Hind. 🇮🇳
          </p>
        </footer>
      </div>
    </>
  );
}

/* --- Helper Components --- */

function FeatureCard({ icon, title, description, color }) {
  return (
    <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 p-8 rounded-3xl hover:bg-gray-800 transition-all duration-300 shadow-xl group hover:-translate-y-2 hover:shadow-2xl" style={{ '--hover-color': color }}>
      <div className="bg-gray-900 w-16 h-16 flex items-center justify-center rounded-2xl mb-6 border border-gray-700 group-hover:border-transparent transition-all duration-300 relative overflow-hidden">
        <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300" style={{ backgroundColor: color }}></div>
        <div className="relative z-10 transform group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text transition-all duration-300" style={{ backgroundImage: `linear-gradient(to right, white, ${color})` }}>
        {title}
      </h3>
      <p className="text-gray-400 leading-relaxed text-sm group-hover:text-gray-300 transition-colors">
        {description}
      </p>
    </div>
  );
}

function FlowStep({ number, title, icon, align, children, isLast, color, textColor = "text-white" }) {
  const isLeft = align === 'left';
  
  return (
    <div className={`relative flex flex-col lg:flex-row items-center justify-between w-full group ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
      
      {/* Content Box */}
      <div className={`w-full lg:w-[45%] ${isLeft ? 'lg:text-right' : 'lg:text-left'} bg-gray-800/40 backdrop-blur-sm p-8 rounded-3xl border border-gray-700/50 shadow-lg relative z-10 transition-all duration-500 hover:bg-gray-800 hover:scale-[1.02] hover:-translate-y-1`}>
        {/* Animated Gradient Border Overlay */}
        <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none`}></div>
        
        <div className={`flex items-center gap-4 mb-4 ${isLeft ? 'lg:justify-end' : 'lg:justify-start'}`}>
          {!isLeft && <div className={`p-3 bg-gray-900 rounded-xl border border-gray-700 group-hover:border-transparent transition-colors`}>{icon}</div>}
          <h4 className={`text-2xl font-bold ${textColor}`}>{title}</h4>
          {isLeft && <div className={`p-3 bg-gray-900 rounded-xl border border-gray-700 group-hover:border-transparent transition-colors`}>{icon}</div>}
        </div>
        {children}
      </div>

      {/* Center Connector (Desktop) */}
      <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center z-20">
        <div className="w-14 h-14 bg-[#0a0f16] border-4 border-gray-700 rounded-full flex items-center justify-center font-black text-xl text-gray-400 group-hover:border-white group-hover:text-white transition-all duration-500 shadow-[0_0_20px_rgba(0,0,0,0.8)] group-hover:scale-110">
          {number}
        </div>
      </div>

      {/* Connecting lines for Desktop */}
      <div className={`hidden lg:block absolute top-1/2 w-[calc(50%-2rem)] h-[2px] bg-gray-700/50 -z-0 ${isLeft ? 'right-1/2' : 'left-1/2'} group-hover:bg-gradient-to-r ${isLeft ? `from-transparent to-white` : `from-white to-transparent`} transition-all duration-500`}></div>

      {/* Mobile Number Indicator */}
      <div className="lg:hidden mt-6 w-12 h-12 bg-[#0a0f16] border-2 border-gray-600 rounded-full flex items-center justify-center font-black text-xl text-gray-300 mb-8 z-10 group-hover:border-white transition-colors">
        {number}
      </div>
      
      {/* Mobile Connector Line */}
      {!isLast && <div className="lg:hidden w-1 h-16 bg-gray-700/50 absolute -bottom-16 z-0 group-hover:bg-white/20 transition-colors"></div>}

      {/* Empty space for the other side on desktop */}
      <div className="hidden lg:block w-[45%]"></div>
    </div>
  );
}