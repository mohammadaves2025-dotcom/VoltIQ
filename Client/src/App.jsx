import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Dashboard from './Pages/Dashboard'
import Result from './Pages/Result'
import Usage from './Pages/Usage'
import Loading from './Pages/Loading'
import HowItWorks from './Pages/HowItWorks'
import { Toaster } from 'react-hot-toast'
import { useState } from 'react'

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  return (
    <>
      <Toaster />

      <div className='min-h-screen bg-[#0B1120] text-white px-6 py-16'>
        <Navbar />
        <Routes >
          {!token && <Route path="*" element={<Login setToken={setToken} />} />}

          {token &&
            <> 
             
              <Route path='/' element={<Home />} />
              <Route path='/loading' element={<Loading />} />
              <Route path='/login' element={<Login setToken={setToken} />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/usage' element={<Usage />} />
              <Route path='/result' element={<Result />} />
              <Route path='/howitworks' element={<HowItWorks />} />
            </>
            }
        </Routes>
      </div>
    </>
  )
}

export default App
