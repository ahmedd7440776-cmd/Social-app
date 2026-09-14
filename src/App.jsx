
import './App.css'
import { createBrowserRouter } from 'react-router-dom'
import Layout from './layout'
import Posts from './pages/Posts'
import Login from './pages/Login'
import Regester from './pages/Regester'
import { RouterProvider } from 'react-router'
import NotFoundPage from './pages/NotFoundPage'
import ProtectedRoute from './protectedRoute'
import AuthProtected from './AuthProtected'
import PostsDetails from './components/PostsDetails'
import Profile from './pages/Profile'

export const router = createBrowserRouter([
  {
    path: '/', element: <Layout />, children: [
      { index: true, element: <ProtectedRoute > <Posts /> </ProtectedRoute> },
      { path: '/posts', element: <ProtectedRoute > <Posts /> </ProtectedRoute> },
      { path: '/profile', element: <ProtectedRoute > <Profile /> </ProtectedRoute> },
      { path: '/login', element: <AuthProtected><Login /> </AuthProtected> },
      { path: '/postDetails/:id', element: <PostsDetails /> },
      { path: '/regester', element: <AuthProtected><Regester /> </AuthProtected> },
      { path: '*', element: <NotFoundPage /> },
    ]
  }
])
function App() {
  return (

    <div className='bg-gray-900  min-h-screen  overflow-x-hidden'>
      <RouterProvider router={router} />
    </div>)

}

export default App




// might be a problem n here