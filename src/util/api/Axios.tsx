import axios from 'axios';
const api = axios.create({
    baseURL: 'http://10.143.1.102:3000',
});
export default api;