import request from "supertest";
import { app } from "../src/app";
import sequelize from "../src/config/database";

afterAll(async () => {
  await sequelize.close(); 
});

describe("Auth & Routes Security", () => {
  it("GET /api/users should return 401 if no token provided", async () => {
    const res = await request(app).get("/api/users");
    expect(res.status).toBe(401);
    expect(res.body.message).toBe("Пользователь не авторизован");
  });

  it("POST /api/users/register should return 400 for invalid data", async () => {
    const res = await request(app).post("/api/users/register").send({
      email: "testgmail123",
      password: "123",
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
  });
});
