import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Map from "./Pages/Map"
import Register from "./Pages/Register"
import Vote from "./Pages/Vote"
import ChatbotPage from './Pages/ChatbotPage'
import NewsPage from './Pages/NewsPage';
import  ComplaintForm from './Pages/ComplaintForm'
import About from './Pages/About'
import EVM from './Pages/Evm'

const App = () => {
  return (
    <div>
      <Routes>
      <Route path="/" element={<Home />} />
       <Route path="/map" element={<Map />} />
      <Route path="/register" element={<Register />} />
      <Route path="/vote" element={<Vote />} />
      <Route path="/chat" element={<ChatbotPage/>} />
            <Route path="/news" element={<NewsPage/>} />
            <Route path='/complaint'element={<ComplaintForm/>} />
            <Route path='/about' element={<About/>}/>
            <Route path='/booth' element={<EVM/>}/>
        

      </Routes>
    </div>
  )
}

export default App
