import axios from "axios";
import axiosInterceptor from "../components/axiosInterceptor";

export async function handleAllPosts() {
  try {
    // const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/posts`, {
    //   headers: {
    //     token: localStorage.getItem("user_token"),
    //   },
    // });
    
    const response = await axiosInterceptor.get('/posts')
    
    // console.log(response.data.data.posts);
    return response.data.data.posts

  } catch (error) {
    if (axios.isAxiosError) {
        throw new Error(error.response?.data.message)
    }

    throw new Error('Network Error')
  }
}

