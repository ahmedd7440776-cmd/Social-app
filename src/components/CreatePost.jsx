import { Avatar, Button, Card } from '@heroui/react'
import { DocumentUpload } from 'iconsax-reactjs'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { CreateUserPost } from './CreatePost.api'
import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function CreatePost({ user }) {
    const { name, photo } = user.data.user
    const { register, handleSubmit, reset } = useForm({
        defaultValues: { body: '' }
    })


    const [postPhoto, setPostPhoto] = useState('')
    const [uploadUserImagee, setUploadUserImagee] = useState('')
    const queryClient = useQueryClient()
    function handleUserPost(data) {
        // console.log(uploadImage.current?.click());

        const formData = new FormData()
        formData.append('body', data.body)
        if (postPhoto) {
            formData.append('image', postPhoto)
        }

        toast.promise(
            mutateAsync(formData),
            {

                loading: 'Creating Your Post Pls Wait....',
                success: function (message) {
                    reset()
                    setUploadUserImagee('')
                    return <h1 className='text-green-500'>{message}</h1>
                },

                error: function (response) {
                    return <h1 className='text-red-500'>{response.message}</h1>

                }
            })
    }

    const uploadImage = useRef(null)


    const { data, mutateAsync } = useMutation({
        mutationFn: CreateUserPost,
        onSuccess: function () {
            queryClient.invalidateQueries({
                queryKey: ['allPosts']
            })
        }
    })
    // console.log(data);

    return (
        <Card className="max-w-4xl w-full border border-red-600 bg-gray-900/29 ">
            <Card.Header>
                <Card.Title className='flex items-center gap-3 mb-3 pb-3 border-b border-white'>
                    <span className='capitalize text-xl text-white'>Goodmorrning {name} what's in your mind...</span>
                </Card.Title>
            </Card.Header>

            <Card.Content>
                <form onSubmit={handleSubmit(handleUserPost)}>
                    <div className='flex items-center gap-4 mb-5'>
                        <Avatar>
                            <Avatar.Image alt="John Doe" src={photo} />
                            <Avatar.Fallback>JD</Avatar.Fallback>
                        </Avatar>
                        <input {...register('body')} type="text" placeholder='Create your post' className=' grow border bg-gray-50 p-2 rounded-xl border-gray-300' />
                        <DocumentUpload onClick={_ => uploadImage.current?.click()} size="40" color='#008600' className='cursor-pointer' />
                    </div>
                    <img className='3/4 mx-auto rounded-3xl mb-2' src={uploadUserImagee} />
                    <Button type='submit' className='w-full'>Create Post</Button>
                </form>

                <input type="file" hidden ref={uploadImage} onChange={e => {
                    setPostPhoto(e.target.files[0])
                    setUploadUserImagee(URL.createObjectURL(e.target.files[0]))
                }} />

            </Card.Content>

        </Card>
    )
}
