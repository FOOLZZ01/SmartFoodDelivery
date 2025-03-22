import axios from "axios";

const API_AUTH = process.env.REACT_APP_API_URL || "http://localhost:5001/api/auth";
const API_RESTAURANT = process.env.REACT_APP_RESTAURANT_URL || "http://localhost:5002/api/restaurants";

export const register = (userData) => axios.post(`${API_AUTH}/register`, userData);
export const login = (userData) => axios.post(`${API_AUTH}/login`, userData);

export const getRestaurants = () => axios.get(`${API_RESTAURANT}`);
export const getMenu = (restaurantId) => axios.get(`${API_RESTAURANT}/${restaurantId}/menu`);
export const placeOrder = (restaurantId, orderData) => 
    axios.post(`${API_RESTAURANT}/${restaurantId}/order`, orderData);
