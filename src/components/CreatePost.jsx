import { Avatar, Button, Card } from '@heroui/react'
import { DocumentUpload } from 'iconsax-reactjs'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { CreateUserPost } from './CreatePost.api'
import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import UpdateProfileModal from '../pages/upadatProfileModle'
import ChangePasswordModal from '../../ChangePasswordModel'
export default function CreatePost({ user }) {

    const { name, photo } = user?.data?.user || {};
    const [isModelOPen, setIsModelOPen] = useState(false);
    const [isPasswordModelOpen, setIsPasswordModelOpen] = useState(false);
    const [isProfileModelOpen, setIsProfileModelOpen] = useState(false);

    const { register, handleSubmit, reset } = useForm({
        defaultValues: { body: '' }
    })
    const [postPhoto, setPostPhoto] = useState('')
    const [uploadUserImagee, setUploadUserImagee] = useState('')
    const queryClient = useQueryClient();
    const uploadImage = useRef(null)

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
                success: (message) => {
                    reset()
                    setUploadUserImagee('')
                    setPostPhoto('')
                    return <h1 className='text-green-500'>{message}</h1>
                },
                error: function (response) {
                    return <h1 className='text-red-500'>{response.message}</h1>
                }
            })
    }

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
        <>
            <Card className="max-w-4xl w-full border mx-auto overflow-hidden border-red-600 bg-gray-900/29 ">
                <Card.Header>
                    <Card.Title className='flex  flex-col justify-between  sm:items-center  gap-3 mb-3 pb-3 border-b border-white'>
                        <span className='capitalize text-base sm:text-xl wrap-break-word text-white'>Goodmorrning {name} what's in your mind...</span>
                      <div className='flex items-center gap-2 self-start sm:self-auto'>
                            <button
                                type='button'
                                onClick={() => setIsModelOPen(true)}
                                className='text-sm sm:text-sm bg-sky-500 hover:bg-sky-700 text-white px-3 py-1.5 rounded-lg transition whitespace-nowrap'>
                                Edit Profile
                            </button>
                            <button
                                type='button'
                                onClick={() => setIsPasswordModelOpen(true)}
                                className='text-xs bg-gray-700 hover:bg-gray-900 text-white px-3 py-1.5 rounded-lg transition whitespace-nowrap'
                            >
                                Change Password
                            </button>
                      </div>
                    </Card.Title>
                </Card.Header>

                <Card.Content>
                    <form onSubmit={handleSubmit(handleUserPost)}>



                        <div className='flex items-center gap-4 sm:gap-4 mb-5'>

                            <div className='cursor-pointer hover:opacity-80 transition shrink-0'
                                onClick={() => setIsModelOPen(true)}
                                title='Click to updata  profile photo'
                            >
                                <Avatar>
                                    <Avatar.Image alt={name || 'John Doe'} src={photo} />
                                    <Avatar.Fallback>JD</Avatar.Fallback>
                                </Avatar>
                            </div>

                            <input {...register('body')} type="text" placeholder='Create a post...'
                             className=' grow border bg-gray-50 p-2 rounded-xl border-gray-300 text-sm sm:text-base min-w-0' />
                            <DocumentUpload onClick={_ => uploadImage.current?.click()} size="40" color='#008600'
                             className='cursor-pointer shrink-0' />
                        </div>


                        <img className='sm:w-3/4 w-full  mx-auto rounded-3xl mb-2 object-cover max-h-80' src={uploadUserImagee} />
                        <Button type='submit' className='bg-sky-600 text-white font-semibold py-2 rounded-xl w-full'>Create Post</Button>
                    </form>

                    <input type="file" hidden ref={uploadImage} onChange={e => {
                        if (e.target.files && e.target.files[0]) {
                            setPostPhoto(e.target.files[0])
                            setUploadUserImagee(URL.createObjectURL(e.target.files[0]))
                        }
                    }
                    } />
                </Card.Content>
            </Card>

            <UpdateProfileModal
             isOpen={isModelOPen}
                onClose={() => setIsModelOPen(false)}
            />
            <ChangePasswordModal
            isOpen={isPasswordModelOpen}
            onClose={()=> setIsPasswordModelOpen(false)}
            />
        </>

    )
}
