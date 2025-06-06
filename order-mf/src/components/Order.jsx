// order-mf/src/components/Order.jsx

import React, { useState, useEffect } from "react";
import {
  fetchOrders,
  createOrder,
  deleteOrder,
} from "../services/orderApi";

export default function Order() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [newOrderData, setNewOrderData] = useState({
    item: "",
    quantity: 1,
  });

  // 1) Ob prvem renderju: naloži trenutna naročila
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetchOrders();
        setOrders(res.data);
        setError(null);
      } catch (err) {
        console.error("Napaka pri pridobivanju naročil:", err);
        setError("Ni mogoče naložiti naročil.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // 2) Handler za submit novega naročila
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createOrder(newOrderData);
      const returned = res.data;

      // Če backend še ni nastavil createdAt, ga nastavimo klientsko
      const clienteAt = returned.createdAt ?? new Date().toISOString();

      setOrders((prev) => [
        ...prev,
        {
          ...returned,
          createdAt: clienteAt,
        },
      ]);

      setNewOrderData({ item: "", quantity: 1 });
      setError(null);
    } catch (err) {
      console.error("Napaka pri kreiranju naročila:", err);
      setError("Ni mogoče ustvariti novega naročila.");
    }
  };

  // 3) Handler za brisanje naročila
  const handleDelete = async (id) => {
    try {
      await deleteOrder(id);
      setOrders((prev) => prev.filter((o) => (o.id || o._id) !== id));
    } catch (err) {
      console.error("Napaka pri brisanju naročila:", err);
      // Po želji: prikaz toast sporočila
    }
  };

  return (
    <div className="container" style={{ padding: 20 }}>
      <h2>Order Service</h2>

      {/* 3) Forma za dodajanje novega naročila */}
      <div
        className="card"
        style={{
          padding: "1rem",
          border: "1px solid #ddd",
          borderRadius: "8px",
          marginBottom: "1.5rem",
        }}
      >
        <h3>Dodaj novo naročilo</h3>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "0.75rem" }}>
            <label style={{ display: "block", marginBottom: "0.25rem" }}>
              Izdelek:
            </label>
            <input
              type="text"
              value={newOrderData.item}
              onChange={(e) =>
                setNewOrderData({ ...newOrderData, item: e.target.value })
              }
              placeholder='Npr. "Pizza Margherita"'
              required
              style={{
                width: "100%",
                padding: "0.5rem",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </div>

          <div style={{ marginBottom: "0.75rem" }}>
            <label style={{ display: "block", marginBottom: "0.25rem" }}>
              Količina:
            </label>
            <input
              type="number"
              value={newOrderData.quantity}
              min={1}
              onChange={(e) =>
                setNewOrderData({
                  ...newOrderData,
                  quantity: +e.target.value,
                })
              }
              required
              style={{
                width: "100%",
                padding: "0.5rem",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#4F46E5",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Ustvari naročilo
          </button>
        </form>
      </div>

      {/* 4) Če je napaka, jo prikaži */}
      {error && (
        <div
          style={{
            marginTop: "1rem",
            color: "#dc3545",
            fontWeight: "bold",
          }}
        >
          {error}
        </div>
      )}

      {/* 5) Seznam naročil */}
      <div style={{ marginTop: "1.5rem" }}>
        <h3>Seznam naročil</h3>
        {loading ? (
          <div>Pridobivanje naročil…</div>
        ) : orders.length === 0 ? (
          <div>Ni nobenih naročil.</div>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {orders.map((o) => {
              // “items” je polje nizov ali null
              const itemsList = Array.isArray(o.items)
                ? o.items.join(", ")
                : "-";
              // “status” (če je prisoten) ali “-”
              const status = o.status ?? "-";
              // “createdAt” (ISO string ali “-”)
              const createdAt = o.createdAt ?? "-";

              return (
                <li
                  key={o.id ?? o._id}
                  style={{
                    background: "#fff",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    padding: "0.75rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  <div>
                    <strong>Izdelek(i):</strong> {itemsList}
                  </div>
                  <div>
                    <strong>Stanje:</strong> {status}
                  </div>
                  <div>
                    <strong>Ustvarjeno:</strong> {createdAt}
                  </div>
                  {/* Gumb za brisanje */}
                  <div style={{ marginTop: "0.5rem" }}>
                    <button
                      onClick={() => handleDelete(o.id ?? o._id)}
                      style={{
                        padding: "0.25rem 0.5rem",
                        backgroundColor: "#EF4444",
                        color: "#fff",
                        border: "none",
                        borderRadius: "3px",
                        cursor: "pointer",
                      }}
                    >
                      Izbriši
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
