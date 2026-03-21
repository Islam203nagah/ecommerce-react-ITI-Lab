import Footer from '../components/ui/footer';
import Navbar from '../components/ui/Navbar';
import { useThemeStore } from '@/store/useThemeStore';
import React from 'react'
import { Outlet } from 'react-router';
function MainLayout () {
  const theme=useThemeStore((state)=>(state.theme));
  return (
    <div style={theme === "light" ? { backgroundColor: "#fff", color: "#000" } : { backgroundColor: "#333", color: "#fff" }} className='min-h-screen flex flex-col'>
      <Navbar />
      <Outlet />
      <Footer/>
    </div>
  )
}

export default MainLayout
