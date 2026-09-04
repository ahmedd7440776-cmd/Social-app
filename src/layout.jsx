import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

export default function Layout() {
  return (
    <>
      <Navbar />
      <div className='min-h-screen bg-gray-900 flex justify-center items-center mt-10 '>
        <Outlet />
        <Toaster />
      </div>

    </>
  )
}
