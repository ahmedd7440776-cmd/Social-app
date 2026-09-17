import { useContext } from 'react'
import { handleAllPosts } from './Post.api'
import USeLikePost from './USeLikePost'
import LoadingScreen from './Loading'
import PostCard from './PostCard'
import CreatePost from '../components/CreatePost'
import { UserTokenProvider } from '../AuthUserContext'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'

export default function Posts() {

  const { likePost } = USeLikePost()
  const { userdata } = useContext(UserTokenProvider)

  const { data, isPending, isError, error, fetchNextPage, isFetchingNextPage, hasNextPage, } = useInfiniteQuery({
    queryKey: ['allPosts'],
    queryFn: handleAllPosts,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  })


  if (isPending) {
    return <LoadingScreen />
  }

  if (isError) {
    return <h1 className='text-5xl text-red-500'>{error.message}</h1>
  }

  return (
    <>
      {userdata &&
        <div className='pt-20 flex gap-3 flex-col'>
          <CreatePost user={userdata} />

          {data?.pages.map((page, pageIndex) => (
            <div key={pageIndex} className="flex flex-col gap-3">
              {page.posts.map((e) => (
                <PostCard key={e._id || e.id} post={e} onLike={() => likePost(e.id || e._id)} />
              ))}
            </div>
          ))}

{/* buton to show more ter */}
{hasNextPage &&(
  <button 
  onClick={()=> fetchNextPage()}
  disabled={isFetchingNextPage}
  className='py-3 bg-blue-600 text-white rounded-lg mt-4' 
  >
    {isFetchingNextPage ? 'Loading more....' : 'load more'}
  </button>
)}
        </div>}
    </>


  )
}




