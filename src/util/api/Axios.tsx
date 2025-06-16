import axios from 'axios';
const api = axios.create({
    baseURL: 'https://flea-enabling-egret.ngrok-free.app',
});
export default api;