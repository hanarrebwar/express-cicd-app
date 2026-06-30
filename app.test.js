const request = require("supertest");
const { app, add } = require("./app");

describe("add()", () => {
  test("adds two positive numbers", () => {
    expect(add(2, 3)).toBe(5);
  });
  test("adds negative and positive", () => {
    expect(add(-1, 1)).toBe(0);
  });
});

describe("routes", () => {
  test("GET / returns ok", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("ok");
  });

  test("GET /health returns healthy", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("healthy");
  });

  test("GET /add/4/6 returns 10", async () => {
    const res = await request(app).get("/add/4/6");
    expect(res.statusCode).toBe(200);
    expect(res.body.result).toBe(10);
  });
});
