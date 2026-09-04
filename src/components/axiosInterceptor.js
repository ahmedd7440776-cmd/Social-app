import axios from "axios";
import { Router } from "react-router-dom";
import { router } from "../App";
// import { promise } from "zod";
// import { Navigate } from "react-router";

const axiosInterceptor = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

axiosInterceptor.interceptors.request.use(
  function (request) {
    if (localStorage.getItem("user_token")) {
      request.headers.token = localStorage.getItem("user_token");
    }
    // console.log(request);

    return request;
  },

  function (error) {
    // console.log(Promise.reject(error));

    return Promise.reject(error);
  },
);

axiosInterceptor.interceptors.response.use(
  function (response) {
    // console.log(response);

    return response;
  },
  function (error) {
    if (error.response && error.response.status === 401) {
      router.navigate("/login");
    }
    return Promise.reject(error);
  },
);
export default axiosInterceptor;
