import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5001/api/auth";

export const register = (userData) => axios.post(`${API_URL}/register`, userData);
export const login = (userData) => axios.post(`${API_URL}/login`, userData);
const API_RESTAURANT = process.env.REACT_APP_RESTAURANT_URL || "http://localhost:5002/api/restaurants";

export const getRestaurants = () => axios.get(`${API_RESTAURANT}`);
export const getMenu = (restaurantId) => axios.get(`${API_RESTAURANT}/${restaurantId}/menu`);