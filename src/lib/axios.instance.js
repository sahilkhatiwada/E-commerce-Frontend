import axios from "axios";

const $axios = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 5000, //5s
});

$axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
export default $axios;
