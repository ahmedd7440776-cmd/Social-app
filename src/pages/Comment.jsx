import { Avatar, Card } from '@heroui/react'
import { useDeleteComment, useEditComment } from './useCommentActions'
import { useState } from 'react';

export default function Comment({ commentt, postId }) {
    // destruct data from the components comment........

    const { _id: commentId , commentCreator: { name, photo, _id : ceratetorId},
     createdAt , content , image , post} = commentt || {};

     // get postId from props or  coment dircitly........
    const currentPostId = postId || (typeof post ==='object' ? post?._id : post);

    // control and modify cases of the input.....
    const [isEditMod, setIsEditMod] = useState(false)
    const [editContent, setEditContent] = useState(content || '')

    // call hooks from the athoer file......
    const { mutate: deltetComment, isPending: isDeleteing } = useDeleteComment()
    const { mutate: editComment, isPending: isSaving } = useEditComment()

    // fun to del comment........
    const handleDelComment = () => {
        if (window.confirm('Are you sure you want to delete this comment?')) {

            console.log( 'currentPostId',postId ,'comment:', commentId);
            
            deltetComment({
                postId: currentPostId,
                commentId: commentId
            })} }
    // fun to save the modifing
    const handleSaveEdit = () => {
        if (!editContent.trim()) return
        editComment({
            postId: currentPostId,
            commentId: commentId,
            content: editContent
        }, {
            onSuccess: function () {
                setIsEditMod(false); // close modifing once its successful
            }})}

    return (
        <Card className="w-9/10 bg-gray-200 mt-3 mx-auto">
            <Card.Header>
                <Card.Title className='flex items-center gap-2 mb-3 pb-3 border-b border-black'>
                    <Avatar>
                        <Avatar.Image alt="John Doe" src={photo} />
                        <Avatar.Fallback>JD</Avatar.Fallback>
                    </Avatar>
                    <div >
                        <h2 className='capitalize lg:text-2xl text-l sm:text-[15px] md-text-xl'>{name}</h2>
                        <h4> {createdAt ? new Date(createdAt).toLocaleDateString().replace(/\//g, '-') : ''}</h4>
                    </div>



                    <div className="m-auto flex gap-3 text-sm">
                        <button onClick={() => {
                            setIsEditMod(!isEditMod);
                            setEditContent(content);
                        }} // to set the origanil text incase you cancled.... 
                            className='text-blue-600  text-l sm:text-xl md:text-[20]  hover:underline'>
                            {isEditMod ? 'Cancel' : 'Edit'}
                        </button>

                        <button
                            onClick={handleDelComment}
                            disabled={isDeleteing}
                            className='text-red-600 text-l sm:text-xl md:text-[20] hover:underline disabled:opacity-50'>

                            {isDeleteing ? 'Deleting...' : 'Delete'}
                        </button>
                    </div>
                </Card.Title>
                <div className='overflow-hidden '>
                    {image && <img className='w-full h-90' src={image} alt={content} />}



                    {/* switch btw editing and orignail content */}
                    {isEditMod ? (
                        <div className='flex gap-2 mt-2'>
                            <input
                                type='text'
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                                className='border p-2 rounded flex-1 bg-white outline-none text-black'
                                placeholder='Edit your comment'
                            />
                            <button onClick={handleSaveEdit}
                                disabled={isSaving}
                                className='bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-800 disabled:opacity-50'
                            >
                                {isSaving ? 'Saving...' : 'Save'}
                            </button>
                        </div>)
                        : <span className='mt-2 text-gray-800 '> {content}</span>}
                </div>
            </Card.Header>
            <Card.Footer className='py-3 mt-3 border-t border-gray-400'>
            </Card.Footer>
        </Card>
    )
}
