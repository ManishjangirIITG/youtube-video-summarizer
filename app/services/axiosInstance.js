import axios from 'axios';
import { useRouter } from 'next/navigation';

const Router = useRouter()

const axiosInstance = axios.create({
  baseURL: `https://${process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN}.${process.env.NEXT_PUBLIC_NHOST_REGION}.nhost.run/v1/graphql`,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token'); // Retrieve token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        console.error('Token expired, please login again.');
        // Add logic to redirect to login page or refresh token
        Router.push('/login')
      }
      return Promise.reject(error);
    }
  );
  
