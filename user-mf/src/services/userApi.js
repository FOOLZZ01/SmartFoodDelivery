import axios from "axios";

// ZUNANJI frontend -> DOKER backend
const API = "/api/auth";

export const register = (userData) => axios.post(`${API}/register`, userData);
export const login = (userData) => axios.post(`${API}/login`, userData);
