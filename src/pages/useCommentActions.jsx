import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

// function to get the api to delete comment....
export default function deleteCommentApi({ postId, commentId }) {   
    return axios.delete
    (`${import.meta.env.VITE_BASE_URL}/posts/${postId}/comments/${commentId}`, {
        headers:  { Authorization: `Bearer ${localStorage.getItem('user_token')}` }
    })
}


//  hook to delete comment.....
export function useDeleteComment() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: deleteCommentApi,
        onSuccess: ()=>{
            queryClient.invalidateQueries({ queryKey: ['allPosts'] })
            queryClient.invalidateQueries({ queryKey: ['postComments'] })
        }
    })}


// function to edit comment......
function editCommentApi({postId , commentId , content}) {
    return axios.put(`${import.meta.env.VITE_BASE_URL}/posts/${postId}/comments/${commentId}`,
        {content}, 
        {headers:{Authorization:`Bearer ${localStorage.getItem('user_token')}`}},
    )}

    
// hook to edit comment......
export function useEditComment() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: editCommentApi,
        onSuccess: ()=> {
            queryClient.invalidateQueries({queryKey: ['allPosts']})
            queryClient.invalidateQueries({ queryKey: ['postComments']})
        }
    })
}










