import axios from 'axios';
const api = axios.create({
    baseURL: 'https://tiffin-wala-admin-backend.vercel.app',
});
export default api;
// baseURL: 'https://tiffin-wala-admin-backend.vercel.app',