// src/services/authService.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;


export const signup = async (userData) => {
  try {
    console.log(userData);
    const response = await axios.post(`${API_URL}/auth/signup`, userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error signing up');
  }
};


export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error logging in');
  }
};


