import axios from "axios";
import axiosInterceptor from "./axiosInterceptor";

export async function CreateUserPost(data) {
  try {
    // const response = await axios.post(
    //   `${import.meta.env.VITE_BASE_URL}/posts`,
    //   data,
    //   {
    //     headers: {
    //       token: localStorage.getItem("user_token"),
    //     },
    //   },
    // );
    // console.log(response);

    const response = await axiosInterceptor.post("/posts", data);

    return response.data.message;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
    throw new Error("Network Error");
  }
}
