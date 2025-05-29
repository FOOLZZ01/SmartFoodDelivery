import axios from "axios";

const BASE_URL = "http://localhost:5002";

// RESTAURANTS
export const getRestaurant = (id) => axios.get(`${BASE_URL}/restaurants/${id}`);
export const addRestaurant = (data) => axios.post(`${BASE_URL}/restaurants`, data);
export const updateRestaurant = (id, data) => axios.put(`${BASE_URL}/restaurants/${id}`, data);
export const deleteRestaurant = (id) => axios.delete(`${BASE_URL}/restaurants/${id}`);

// MENUS
export const getMenu = (restaurantId) =>
  axios.get(`${BASE_URL}/restaurants/${restaurantId}/menu`);

export const addMenuItem = (restaurantId, data) =>
  axios.post(`${BASE_URL}/restaurants/${restaurantId}/menu`, data);

export const updateMenuItem = (menuId, data) =>
  axios.put(`${BASE_URL}/restaurants/menu/${menuId}`, data);

export const deleteMenuItem = (menuId) =>
  axios.delete(`${BASE_URL}/restaurants/menu/${menuId}`);
