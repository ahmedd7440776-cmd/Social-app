import { ClipLoader, ScaleLoader, SyncLoader } from 'react-spinners'

export default function LoadingScreen() {
  return (
    <div className='inset-0 z-50 min-h-screen flex fixed justify-center items-center bg-gray-300'>
          <ClipLoader  color='red' size={50}/>
    </div>
  )
}
