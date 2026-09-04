import { Avatar, Card } from '@heroui/react'

export default function Comment({ commentt }) {

    const { commentCreator :{name , photo }, createdAt, content , image} = commentt 
    return (
        <Card className="w-9/10 bg-gray-200 mt-3 mx-auto">
            <Card.Header>
                <Card.Title className='flex items-center gap-2 mb-3 pb-3 border-b border-black'>
                    <Avatar>
                        <Avatar.Image alt="John Doe" src={photo} />
                        <Avatar.Fallback>JD</Avatar.Fallback>
                    </Avatar>
                    <div >
                        <h2 className='capitalize'>{name}</h2>
                        <h4> {new Date(createdAt).toLocaleDateString().replace(/\//g, '-')}</h4>
                    </div> 
                </Card.Title>
                <Card.Description className='overflow-hidden '>
                    {image && <img className='w-full h-90' src={image} alt={content} />}
                    {content}
                </Card.Description>
            </Card.Header>
            <Card.Footer className='py-3 mt-3 border-t border-gray-400'>

            </Card.Footer>
        </Card>
    )
}
