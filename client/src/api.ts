import axios from 'axios';

// Create an instance of Axios
const api = axios.create({
  baseURL: 'http://localhost:5001', // Replace with your backend base URL
});

// Set up an interceptor to attach the token to every request if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Get the token from localStorage

    if (token) {
      // If the token exists, attach it to the request headers
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Handle the error if something goes wrong before the request is sent
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
    (response) => {
      // If the request is successful, just return the response
      return response;
    },
    (error) => {
      if (error.response && error.response.status === 401) {
        // Handle 401 errors (e.g., token expired or invalid)
        console.error('Unauthorized, logging out...');
        localStorage.removeItem('token'); // Clear the token from localStorage
        window.location.href = '/login'; // Redirect to login page
      }
  
      return Promise.reject(error); // Reject the error so the request fails
    }
  );

export default api;
