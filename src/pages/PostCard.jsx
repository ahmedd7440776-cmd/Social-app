import { Avatar, Card } from '@heroui/react'
import { Like1, MessageText1, Share } from 'iconsax-reactjs'
import { useContext, useState } from 'react'
import Comment from './Comment'
import { Link } from 'react-router-dom'
import { More, Trash, Edit2 } from 'iconsax-reactjs'
import usePostActions from './usePostActions'
import { UserTokenProvider } from '../AuthUserContext'


export default function PostCard({ post, PostsDetails, onLike }) {
    // distraction data here.......,,,,,,/,/,/,/,/
    const { _id: postId, commentsCount, createdAt,
        user: { name, photo, _id: postOwnerId }, body, image, topComment, likes, likesCount } = post

    // console.log(post);

    const { userdata } = useContext(UserTokenProvider);
    const currentUserId = userdata?.data?.user?.id;
    const isLiked = likes?.includes(currentUserId)
    const { deletePost, isEditing, editPost } = usePostActions()
    const [showMenu, setShowMenu] = useState(false)
    const [isEditMode, setIsEditMode] = useState(false)
    const [editBody, setEditBody] = useState(body)

    const isOwner = postOwnerId === currentUserId

    function handleDelete() {
        if (window.confirm('Are you sure you want to delete this post?'))
            deletePost(postId)
    }

    function handleSavedEdit() {
        editPost({ postId, body: editBody }, { onSuccess: () => setIsEditMode(false) })
    }
    // console.log(id);

    return (
        <Card className="max-w-4xl w-full overflow-hidden border-red-500 border-2 ">
            <Card.Header>
                <Card.Title className='flex items-center justify-between  gap-2 mb-3 pb-3 border-b border-gray-400'>
                    <div className='flex items-center gap-3'>
                        <Avatar className='w-8 h-8  sm:w-11 sm:h-11 md:w-15 md:h-15'>
                            <Avatar.Image alt="John Doe "   src={photo} />
                            <Avatar.Fallback>TITO</Avatar.Fallback>
                        </Avatar>
                        <div>
                            <h2 className='capitalize text-[15]  sm:text-[17px] md:text-[18px] '>_{post.user.name}_</h2>
                            <h4 className='text-[10px] sm:text-[13px] md:text-[15px]'> {new Date(createdAt).toLocaleDateString().replace(/\//g, '-')}</h4>
                        </div>
                    </div>



                    {isOwner && (<div className='relative ml-auto'>
                        <More size='24' onClick={() => setShowMenu(!showMenu)} className='cursor-pointer' />
                        {showMenu && (
                            <div className='absolute right-0 top-6 bg-white shadow-lg rounded-lg z-10 w-32'>
                                <button onClick={() => { setIsEditMode(true); setShowMenu(false) }}
                                    className='flex items-center gap-2 px-3 py-2 w-full hover:bg-gray-100 text-sm  text-green-600'>
                                    <Edit2  size='18' />Edit
                                </button>
                                <button onClick={() => { handleDelete(); setShowMenu(false) }}
                                    className='flex items-center gap-2 px-3 py-2 w-full hover:bg-gray-100 text-red-500'>
                                    <Trash size='18' /> Delete
                                </button>
                            </div>
                        )}

                    </div>)}




                </Card.Title>

                <Card.Description className='overflow-hidden wrap-break-word '>
                    {isEditMode ? (<div className='flex flex-col sm:flex-row gap-2'>
                        <input value={editBody}
                            onChange={(e) => setEditBody(e.target.value)}
                            className='flex-1 border rounded-lg px-2 py-1 text-[16px] sm:text-[19px] ' />
                        <div className='flex gap-2 justify-end'>

                            <button onClick={handleSavedEdit} disabled={isEditing} className='text-blue-500 text-[16px] sm:text-[20px]'>
                                {isEditing ? 'Saving...' : 'Save'}
                            </button>
                            <button className='text-red-700 text-[16px] sm:text-[19px] ' onClick={() => setIsEditMode(false)}>
                                Cancel
                            </button>
                        </div>

                    </div>) :
                        <>{image && <img className='w-full rounded-lg mb-2 object-cover max-h-96 ' src={image} alt={body} />}
                            <p className='text-sm sm:text-[16px] md:text-[20px]'>
                                {body}
                            </p>

                        </>}

                </Card.Description>
            </Card.Header>
            <Card.Footer className='flex-col py-3 mt-3 border-t border-gray-400'>
                <div className='flex justify-between items-center w-full'>
                    <div className='flex gap-3 items-center  '>

                        <div className='cursor-pointer flex items-center gap-1 text-sm sm:text-[17px] md:text[20px] lg:text-[22px]' onClick={() => {onLike();}}>
                            <Like1 size='40' color='#249640'
                                variant={isLiked ? 'Bold' : 'Linear'}
                            />
                        </div>
                        <span>{likesCount}</span>
                        <Share size='40' color='#117689' />
                    </div>
                    <div className='flex items-center gap-3'>
                        {!PostsDetails && <Link className='gap-3 flex items-center text-sm  md:text-xl' to={`/postDetails/${postId}`}>
                            {commentsCount}
                            <MessageText1 size="32" color="#990000" />
                            <span className='text-[15px] sm:text-[17px] md:text-[20px] lg:text-[21px] text-green-900'>Show Post</span></Link>}
                    </div>
                </div>
            </Card.Footer>
            {topComment && !PostsDetails && <Comment commentt={topComment} postId={postId} />}
        </Card>




    )
}
