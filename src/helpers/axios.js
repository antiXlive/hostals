import axios from 'axios';

const axiosInstance = axios.create({

  // baseURL: 'http://100.110.158.173:3000',
  // baseURL: 'http://192.168.43.96:3001',
  baseURL: 'https://hostals-iiitm.herokuapp.com',
  headers: { 'api_key': 'e52ss1bl50ba-67tc4-s482o6-8h2e6-8fdde8cc779f' },
  validateStatus: function (status) {

    return status >= 200 && status <= 503;
  },
});

export default axiosInstance;