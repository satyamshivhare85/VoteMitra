import React from 'react'
import AnimatedText from '../Components/Register/AnimatedText/AnimatedText'
import Navbar from '../Components/Navbar/Navbar'
import Footer from '../Components/Footer/Footer'
import FaceRegistration from '../Components/Register/FaceRegisteration.jsx/FaceRegisteration'
import '../Components/Register/AnimatedText/AnimatedText.css'

const Register = () => {
  return (
  <div className="text-gray-200 flex flex-col min-h-screen">
      <Navbar />
      <div className="mt-19"></div>
      <AnimatedText />
      <div className="text-center py-8 px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-white">
          Take initiative to participate in Smart Voting
        </h2>
        <p className="mt-4 text-lg text-gray-400">
          Your vote craves transparency, secured by our three-layered system.
        </p>
      </div>

      <main className="flex-grow flex items-center justify-center p-4 pt-0">
        <FaceRegistration />
      </main>
      <Footer />
    </div>
  )
}

export default Register
