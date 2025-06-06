// order-mf/src/services/orderApi.js

import axios from "axios";

const BASE = "/api/orders";

export const fetchOrders = () => {
  return axios.get(BASE);
};

export const createOrder = (orderData) => {
  // Preoblikujemo { item, quantity } → { items: [item], quantity }
  const payload = {
    items: [orderData.item],
    quantity: orderData.quantity,
    // Če backend zahteva še status, userId, restaurantId ipd., jih lahko dodate
    // status: "CREATED",
    // userId: ...,
    // restaurantId: ...,
  };
  return axios.post(BASE, payload);
};

// Nova funkcija za brisanje naročila
export const deleteOrder = (id) => {
  return axios.delete(`${BASE}/${id}`);
};

// Nova funkcija za posodobitev statusa naročila
export const updateOrderStatus = (id, status) => {
  // Pošiljamo le novo vrednost statusa
  return axios.put(`${BASE}/${id}`, { status });
};
