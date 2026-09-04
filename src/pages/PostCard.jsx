
import { Avatar, Card } from '@heroui/react'
import { Like1, MessageText1, Share } from 'iconsax-reactjs'
import React, { useEffect, useState } from 'react'
import Comment from './Comment'
import { Link } from 'react-router-dom'
export default function PostCard({ post, PostsDetails }) {
    // console.log(post)

    const {
        id, commentsCount, createdAt, user: { name, photo }, body, image, topComment
    } = post
    // console.log(post);
    return (
        <Card className="max-w-4xl w-full  border-red-500 border-2 ">
            <Card.Header>
                <Card.Title className='flex items-center gap-2 mb-3 pb-3 border-b border-gray-400'>
                    <Avatar>
                        <Avatar.Image alt="John Doe" src={photo} />
                        <Avatar.Fallback>TITO</Avatar.Fallback>
                    </Avatar>
                    <div >
                        <h2 className='capitalize'>_{post.user.name}_</h2>
                        <h4> {new Date(createdAt).toLocaleDateString().replace(/\//g, '-')}</h4>
                    </div>
                </Card.Title>

                <Card.Description className='overflow-hidden'>
                    {image && <img className='w-full' src={image} alt={body} />}
                    {body}
                </Card.Description>
                
            </Card.Header>
            <Card.Footer className='flex-col py-3 mt-3 border-t border-gray-400'>
                <div className='flex justify-between w-full'>
                    <div className='flex gap-2 '>
                        <Like1 size='40' color='#249600' />
                        <Share size='40' color='#117689' />
                    </div>
                    <div className='flex items-center gap-3'>
                        {!PostsDetails && <Link className='gap-3 flex items-center ' to={`/postDetails/${id}`}>
                            {commentsCount}
                            <MessageText1 size="32" color="#990000" />
                            Show Post</Link>}
                    </div>
                </div>
            </Card.Footer>
            {topComment && !PostsDetails && <Comment commentt={topComment} />}
        </Card>




    )
}
