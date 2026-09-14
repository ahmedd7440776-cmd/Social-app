import PostCard from "./PostCard"
import { useQuery } from "@tanstack/react-query"
import axiosInterceptor from "../components/axiosInterceptor"
import UpdateProfileModal from "./upadatProfileModle"
import ChangePasswordModal from "../../ChangePasswordModel"
import { useState } from "react"


const fetchProfileAndPosts = async () => {

  //1- get users profile data   
  const { data: userRes, } = await axiosInterceptor.get('/users/profile-data');

  const user = userRes?.data?.user
  const userId = user?._id || user?.id

  if (!userId) { return { user: null, posts: [] } }

  //2- get users posts
  const { data: postRes } = await axiosInterceptor.get(`/users/${userId}/posts`)
  const postList = postRes?.data?.posts || postRes?.posts || postRes?.data || []

  return {
    user,
    posts: Array.isArray(postList) ? postList : []
  }
}


export default function Profile() {

  const [isUpdataProfileOpen, setIsUpdataProfileOpen] = useState(false)
  const [isChangPasswordOpen, setIsChangPasswordOpen] = useState(false)

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['userProfile'],
    queryFn: fetchProfileAndPosts,
  })

  if (isPending) {
    return (
      <div className="flex justify-center items-center">
        <div className="text-blue-400 text-sm sm:text-[14px] md:text-[18px]">loading your profile....</div>
      </div>
    )
  }


  if (isError) {
    return (
      <div className="text-center text-sm sm:text-[14px] md:text-[18px] text-red-500 ">
        Someting went wrong: {error.message}
      </div>
    )
  }

  const user = data?.user
  const posts = data?.posts || []






  return (
    <div className="w-full space-y-6 my-23">
      {/* users card */}
      <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700 flex flex-col md:flex-row md:justify-between items-center gap-6">
        <img
          src={user?.photo}
          alt={user?.name}
          className="w-24 h-24 rounded-full object-cover border-2 border-blue-500"
        />
        <div className="text-center md:text-right space-y-2 ">
          <h1 className="text-sm sm:text-lg md:text-xl lg:text-2xl text-white">{user?.name}</h1>
          <p className="text-sm sm:text-[16px] md:text-[18px] lg:text-[22px] text-gray-400">{user?.email}</p>
          <div className="inline-block bg-600/20 text-blue-400 rounded-full border border-l-blue-500/30 py-1 px-3 text-xs sm:text-sm md:text-lg lg:text-xl">
            Number of posts: {posts?.length || 0}
          </div>
        </div>
      </div>


      {/* Actions buttons */}

      <div className="flex flex-col justify-end sm:flex-row gap-3 w-full md:w-auto ">
        <button
          onClick={() => setIsChangPasswordOpen(true)}
          className= "px-2 bg-blue-600 hover:bg-blue-800 text-white py-2 rounded-lg transition duration-200 text-sm sm:text-base"
        >Edit Profile
        </button>

<button
onClick={()=> setIsUpdataProfileOpen(true)}
          className= "px-2 bg-gray-600 hover:bg-gray-800 text-white py-2 rounded-lg transition duration-200 text-sm sm:text-base"

>Change password</button>

      </div>


      {/*  post section */}

      <div>
        <h2 className="text-[17px] sm:text-[19px] md:text-[21px] lg:text-[23px] font-bold text-white mb-4 border-b border-gray-800 pb-2">
          My Posts

        </h2>

        {posts?.length === 0 ? (
          <div className="text-center py-10 text-gray-400 " >  You have not post any content yet?!</div>
        ) : <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {posts?.map((post) => {
            return <PostCard key={post._id || post.id} post={post} />
          })}
        </div>}
      </div>



      <UpdateProfileModal isOpen={isUpdataProfileOpen}
onClose={()=> setIsUpdataProfileOpen(false)}
CurrentUser={user}
/> 

<ChangePasswordModal 
        isOpen={isChangPasswordOpen}
onClose={()=>setIsChangPasswordOpen(false)}
/>
    </div>



  )
}






