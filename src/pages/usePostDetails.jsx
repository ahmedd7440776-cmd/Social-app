
import axiosInterceptor from "../components/axiosInterceptor"
import axios from "axios"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"



export default function usePostDetails(id) {

    function getSinglePost() {
        // console.log(axiosInterceptor.get(`/posts/${id}`));const{data: commentDTA}

        return axiosInterceptor.get(`/posts/${id}`)
    }


    function getPostComments() {
        return axios.get(`${import.meta.env.VITE_BASE_URL}/posts/${id}/comments`, {
            headers: {
                token: localStorage.getItem('user_token')
            }
        })
    }
// console.log(id);


    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['postDetails', id],
        queryFn: getSinglePost,
    })

    const { data: commentData } = useQuery({
        queryKey: ['postComments', id],
        queryFn: getPostComments
    })
    // console.log('RAW ', commentData);

    const queryClient = useQueryClient()
    
    function addComment(comment) {
        return axios.post(`${import.meta.env.VITE_BASE_URL}/comments`,
            { content: comment, post: id },
            { headers: { token: localStorage.getItem('user_token') } }
        )
    }
// async function call() {
//     console.log( await addComment());

// }
// call()

    const { mutate: createComment, isPending } = useMutation({
        mutationFn: addComment,
        onSuccess: function () {
            queryClient.invalidateQueries({ queryKey: ['postComments', id] })
        }
    })

    return { data, isLoading, isError, error, commentData, createComment, isPending }
}

