import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios';
import React from 'react'

export default function USeLikePost() {
    const queryClient = useQueryClient()


     function toggleLike(postId) {
        console.log(postId);
        
                    return axios.put(`${import.meta.env.VITE_BASE_URL}/posts/${postId}/like`,
                        {},
                        { headers: { Authorization: `Bearer ${localStorage.getItem('user_token')}`}}
                    )}
    const {mutate: likePost , isPending: isLikeing} = useMutation({
        mutationFn: toggleLike,
         onSuccess: function () {
            queryClient.invalidateQueries({queryKey:['allPosts']})
            queryClient.invalidateQueries({queryKey:['postDetails']})
        }
    })
    
  return  {likePost , isLikeing}
}