import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'

export default function usePostActions() {
    const queryClient = useQueryClient()

    function deletPostApi(postId) {
        return axios.delete(
            `${import.meta.env.VITE_BASE_URL}/posts/${postId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('user_token')}`
            }})
    }

    function editPostApi({ postId, body }) {
        
        const formData = new FormData()
        formData.append('body', body)
        return axios.put(`${import.meta.env.VITE_BASE_URL}/posts/${postId}`, formData, {
            headers: { Authorization: `Bearer ${localStorage.getItem('user_token')}` }
        })
 }

    const { mutate: deletePost, isPending: isDeleting } = useMutation({
        mutationFn: deletPostApi,
        onSuccess: function () {
            queryClient.invalidateQueries({ queryKey: ['allPosts'] })
            queryClient.invalidateQueries({ queryKey: ['postDetails'] })
        }
    })

    const { mutate: editPost, isPending: isEditing } = useMutation({
        mutationFn: editPostApi,
        onSuccess: function () {
            queryClient.invalidateQueries({ queryKey: ['allPosts'] })
            queryClient.invalidateQueries({ queryKey: ['postDetails'] })
        }
    })

    return { deletePost, isDeleting, editPost, isEditing }
}
