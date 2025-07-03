import axios from "axios";
import { API_BASE_URL } from "./config";

const httpClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add interceptors for auth, logging, etc.
httpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response interceptor to handle token expiration
httpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Check if the error is due to unauthorized access (401)
    if (error.response?.status === 401) {
      // Clear all localStorage data
      localStorage.clear();

      // Redirect to login page
      window.location.href = "/login";

      // Show a message to the user
      console.log("Session expired. Please log in again.");
    }

    return Promise.reject(error);
  }
);

export default httpClient;
