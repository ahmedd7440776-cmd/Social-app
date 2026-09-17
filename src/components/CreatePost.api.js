import axios from "axios";
import axiosInterceptor from "./axiosInterceptor";

export async function CreateUserPost(data) {
  try {
    const response = await axiosInterceptor.post("/posts", data);

    return response.data.message;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
    throw new Error("Network Error");
  }
}
