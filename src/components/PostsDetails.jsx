import { useParams } from 'react-router-dom'
import LoadingScreen from '../pages/Loading'
import PostCard from '../pages/PostCard'
import usePostDetails from '../pages/usePostDetails'
import Comment from '../pages/Comment'
import { useForm } from 'react-hook-form'
import { Button } from '@heroui/react'
import { useRef, useState } from 'react'
import { DocumentUpload } from 'iconsax-reactjs'

export default function PostsDetails() {

    const { id } = useParams()
    const { data, isLoading, isError, error, commentData, createComment, isPending, likePost, isLikeing } = usePostDetails(id)
    const [commentPhoto, setCommentPhoto] = useState(null)
    const uploadCommentImage = useRef(null)
    // console.log(id);


    const { register, reset, handleSubmit } = useForm({
        defaultValues: { content: '' }
    })
    function handleAddComment(formData) {
        createComment(
            { content: formData.content, image: commentPhoto }
            , {
                onSuccess: function () {
                    reset()
                    setCommentPhoto(null)
                }})}

    if (isLoading) {
        return <LoadingScreen />
    }

    if (isError) {
        return <h1 className='text-5xl text-red-500'>{error.message}</h1>
    }
    // console.log(likePost);

    return (
        <>
            {<div className='pt-20 min-w-full flex items-center justify-center flex-col'>
                <PostCard post={data?.data?.data?.post} PostsDetails onLike={likePost} />

                <div className='max-w-4xl w-full mt-3'>
                    <form className='flex gap-2 mb-3' onSubmit={handleSubmit(handleAddComment)}>
                        <input
                            {...register('content')}
                            placeholder='Add your comment'
                            type="text"
                            className='flex-1 border-2 rounded-lg px-3 py-2 border-red-600 bg-white text-black ' />

                        <DocumentUpload onClick={() => uploadCommentImage.current?.click()}
                            size='32'
                            color='#697689'
                            className='cursor-pointer'
                        />

                        <input type="file"
                            hidden
                            ref={uploadCommentImage}
                            onChange={(e) => setCommentPhoto(e.target.files[0])}
                        />

                        <Button type='submit' isDisabled={isPending}>
                            {isPending ? 'Posting...' : 'Comment'}
                        </Button>
                    </form>

                    {commentData?.data.data.comments?.map(function (comment) {
                        return <Comment key={comment._id} commentt={comment} postId={id} />
                    })}
                </div>
            </div>}

        </>

    )
}
