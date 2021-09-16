import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: process.env.REACT_APP_WCM_API_BASE_URL,
  headers: { 'Access-Control-Allow-Origin': '*' },
});

export default axiosInstance;
