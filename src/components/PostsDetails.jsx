import { useParams } from 'react-router-dom'
import LoadingScreen from '../pages/Loading'
import PostCard from '../pages/PostCard'
import usePostDetails from '../pages/usePostDetails'
import Comment from '../pages/Comment'
import { useForm } from 'react-hook-form'
import { Button } from '@heroui/react'

export default function PostsDetails() {

    const { id } = useParams()
    const { data, isLoading, isError, error, commentData, createComment, isPending } = usePostDetails(id)
    // console.log(id);
    

    const { register, reset, handleSubmit } = useForm({
        defaultValues: { content: '' }
    })
    function handleAddComment(formData) {
        createComment(formData.content, {
            onSuccess: (function () {
                reset()
            })
        })
    }
    // function getSinglePost() {
    //     return axios.get(`${import.meta.env.VITE_BASE_URL}/posts/${id}`, {
    //         headers: {
    //             token: localStorage.getItem('user_token')
    //         }
    //     })
    // } 

    // const { data, isLoading, isError, error } = useQuery({
    //     queryKey: ['postDetails', id],
    //     queryFn: getSinglePost
    // })


    if (isLoading) {
        return <LoadingScreen />
    }

    if (isError) {
        return <h1 className='text-5xl text-red-500'>{error.message}</h1>
    }
    return (
        <>

            {<div className='pt-20 min-w-full flex items-center justify-center flex-col'>
                <PostCard post={data?.data?.data?.post} PostsDetails />

                <div className='max-w-4xl w-full mt-3'>
                    <form className='flex gap-2 mb-3' onSubmit={handleSubmit(handleAddComment)}>
                        <input
                            {...register('content')}
                            placeholder='Add your comment'
                            type="text"
                            className='flex-1 border-2 rounded-lg px-3 py-2 border-red-600 bg-white text-black ' />

                        <Button type='submit' isDisabled={isPending}>
                            {isPending ? 'Posting...' : 'Comment'}
                        </Button>
                    </form>

                    {commentData?.data.data.comments?.map(function (comment) {
                        return <Comment key={comment._id} commentt={comment} />
                    })}
                </div>

            </div>}

        </>

    )
}
