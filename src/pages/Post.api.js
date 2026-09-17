import axios from "axios";
import axiosInterceptor from "../components/axiosInterceptor";

export async function handleAllPosts({pageParam = 1}) {
  try {

    // request the posts of the sepecifc page 
    const response = await axiosInterceptor.get(`/posts?.page=${pageParam}&limit=20`)

    // return tthe posts and the next page's number
    return {
      posts: response.data.data.posts,
      nextPage: response.data.data.posts.length > 0 ? pageParam + 1 : null,
    };

  } catch (error) {
    if (axios.isAxiosError) {
        throw new Error(error.response?.data.message)
    }

    throw new Error('Network Error')
  }
}

