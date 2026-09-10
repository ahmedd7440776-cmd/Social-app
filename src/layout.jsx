import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

export default function Layout() {
  return (
    <>
      <Navbar />
      <div className=' w-full max-w-4xl mx-auto px-4 sm:px-5 lg:px-8 py-6 bg-gray-900  '>
        <Outlet />
        <Toaster />
      </div>

    </>
  )
}
