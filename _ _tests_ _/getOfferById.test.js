const request = require("supertest");
const app = require("../app.js");
const { prisma } = require("../config/db.js");

describe("GET /offers/:id", () => {
  it("returns 200 with offer details including notes for an existing offer", async () => {
    const res = await request(app).get("/offers/1");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("offer_id", 1);
    expect(res.body).toHaveProperty("notes");
    expect(res.body).toHaveProperty("driver_name");
    expect(res.body).toHaveProperty("email");
  });

  it("returns 404 for an offer that does not exist", async () => {
    const res = await request(app).get("/offers/999999");
    expect(res.status).toBe(404);
  });
   afterAll(async () => {
    await prisma.$disconnect();
  });
});