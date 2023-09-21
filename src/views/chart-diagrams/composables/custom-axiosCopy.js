/* eslint-disable quotes */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable semi */
import axios from "axios";
// import router from "../router";

const customAxios = axios.create({
  // baseURL: 'https://projectdental.nl/api/',
  // baseURL: "https://projectdental.nl/staging-backend/api/",
  // baseURL: 'http://localhost:8000/api/',
});

const requestHandler = (request) => {
  request.headers.Authorization = `Bearer ${sessionStorage.getItem(
    "dentalSoftToken"
  )}`;

  return request;
};
const errorHandler = (error) => {
  console.log(error);
  Promise.reject(error);
}

customAxios.interceptors.request.use(
  (request) => requestHandler(request),

  (error) => errorHandler(error)
);

customAxios.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response.status === 401) {
      router.push("/login");
    }
  }
);

export default customAxios;
