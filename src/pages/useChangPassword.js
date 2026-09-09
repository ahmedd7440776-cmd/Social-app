import axiosInterceptor from '../components/axiosInterceptor'
import { useMutation } from '@tanstack/react-query'

export async function changPasswordApi(data) {


    return axiosInterceptor.patch('users/change-my-password', data)
}


export function useChangePassword(){
    return useMutation({
        mutationFn: changPasswordApi
    })
}