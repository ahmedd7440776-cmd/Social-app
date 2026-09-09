import { useContext } from 'react'
import { handleAllPosts } from './Post.api'
import USeLikePost from './USeLikePost'
import LoadingScreen from './Loading'
import PostCard from './PostCard'
import CreatePost from '../components/CreatePost'
import { UserTokenProvider } from '../AuthUserContext'
import { useQuery } from '@tanstack/react-query'

export default function Posts() {
const {likePost} = USeLikePost()

  // const [allPosts, setAllPosts] = useState(null)
  const { userdata } = useContext(UserTokenProvider)

  // useEffect(function () {
  //   handleAllPosts().then(data => setAllPosts(data)
  //   )
  // }, [])
 
const {data , isLoading , isError ,error} = useQuery({
  queryKey: ['allPosts'],
  queryFn: () => handleAllPosts()
})

if(isLoading){
  return <LoadingScreen />
}
 
if(isError){
  return <h1 className='text-5xl text-red-500'>{error.message}</h1>
}
  return (
    <>
      {userdata &&   <div className='pt-20 flex gap-3 flex-col'>
        <CreatePost  user={userdata}/>
        {data && data.map((e) => <PostCard key={e.id} post={e} onLike={()=> likePost(e.id)} />)}
      </div>}
    </>


  )
}

