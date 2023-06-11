import axios from "axios";
export const BACKEND_BASE_URL = 'http://localhost:8000/'
export const backendApi = axios.create({
    baseURL: BACKEND_BASE_URL
})