const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../src/app");
const User = require("../src/models/User");
const bcrypt = require("bcryptjs");

beforeEach(async () => {
  await User.deleteMany();  // 🧹 Počisti bazo pred vsakim testom

  // 🔹 Ustvari testnega uporabnika za prijavo
  const hashedPassword = await bcrypt.hash("password123", 10);
  await User.create({
    name: "Test User",
    email: "test@example.com",
    password: hashedPassword,
  });
});

afterAll(async () => {
  await mongoose.connection.close();  // 🔌 Zapri povezavo z bazo po testih
});

describe("User Service API", () => {
  it("should register a new user", async () => {
    const uniqueEmail = `test${Date.now()}@example.com`;

    const res = await request(app).post("/api/auth/register").send({
      name: "Test User",
      email: uniqueEmail,
      password: "password123"
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("message", "Uporabnik uspešno registriran");
  });

  it("should not register an existing user", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Existing User",
      email: "test@example.com",
      password: "password123"
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error", "Uporabnik že obstaja");
  });

  it("should login with correct credentials", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "test@example.com",
      password: "password123"
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");  // ✅ Preveri, če je JWT token vrnjen
  });

  it("should not login with incorrect password", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "test@example.com",
      password: "wrongpassword"
    });

    expect(res.status).toBe(401);  // ✅ Prijava mora spodleteti
    expect(res.body).toHaveProperty("error", "Napačno geslo");
  });

  it("should not login with non-existing email", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "notexist@example.com",
      password: "password123"
    });

    expect(res.status).toBe(404);  // ✅ API mora vrniti 404, ker uporabnik ne obstaja
    expect(res.body).toHaveProperty("error", "Uporabnik ne obstaja");
  });
});
