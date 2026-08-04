const request = require("supertest");
const app = require("../app.js");

describe("App foundation", () => {
  it("GET / responds with 200 and the running message", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.text).toBe("Server is running!");
  });

  it("GET an unknown route responds with 404", async () => {
    const res = await request(app).get("/this-route-does-not-exist");
    expect(res.status).toBe(404);
  });
});