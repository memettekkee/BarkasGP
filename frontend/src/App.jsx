import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { useState } from 'react'

import Home from "./pages/home"
import Marketplace from "./pages/marketplace"
import Register from "./pages/register"
import Login from "./pages/login"
import Cobacoba from "./pages/cobacoba"

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/marketplace" element={<Marketplace/>} />
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/test" element={<Cobacoba/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
