import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import { useState } from 'react'

import Home from "./pages/home"
import Marketplace from "./pages/marketplace"
import Register from "./pages/register"
import Login from "./pages/login"
import Cobacoba from "./pages/cobacoba"
import Dashboard from "./pages/dashboard"

import Product from "./pages/dashboard-pages/product"
import AddProduct from "./pages/dashboard-pages/add-product"

import PrivateRoute from "./utils/PrivateRoute"

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/test" element={<Cobacoba />} />
          <Route
            path="/dashboard/*"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          >
            <Route index element={<Navigate to="product" />} />
            <Route path="product" element={<Product />} />
            <Route path="add-product" element={<AddProduct />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
