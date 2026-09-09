
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useContext } from 'react';
import { getUserData } from '../pages/Login'; // fun to get users data
import { UserTokenProvider } from '../AuthUserContext';
import axiosInterceptor from '../components/axiosInterceptor';

async function uploadProfilePhotoApi(file) {
    const formData = new FormData();
    formData.append('photo', file);
    // const response = await axios.put(
    //     `${import.meta.env.VITE_BASE_URL}/users/upload-photo`,
    //     formData,
    //     {
    //         headers: {
    //             token: localStorage.getItem('user_token')
    //         }
    //     }
    // );
    
    
    
    // return response.data;

return axiosInterceptor.put('users/upload-photo' , formData)


}

export function useUploadProfilePhoto() {
    const queryClient = useQueryClient();
    const { setUserData } = useContext(UserTokenProvider);

    return useMutation({
        mutationFn: uploadProfilePhotoApi,
        onSuccess: async () => {
            // regeting the user data to updata the state with the photo./..../
            if (typeof getUserData === 'function') {
                const freshUserData = await getUserData();
                setUserData(freshUserData);
            }
            // updata the cash in the React Query to updata all the osts with the new photo
            queryClient.invalidateQueries({ queryKey: ['allPosts'] });
            queryClient.invalidateQueries({ queryKey: ['posts'] });
            queryClient.invalidateQueries({ queryKey: ['postDetails'] });
        }
    });
}