require("dotenv").config();
const request = require("supertest");
const jwt = require("jsonwebtoken");
const app = require("../app.js");

const token = jwt.sign({ user_id: 1 }, process.env.JWT_SECRET, { expiresIn: "1h" });

describe("POST /offers", () => {
  it("creates an offer when authenticated with valid data", async () => {
    const res = await request(app)
      .post("/offers")
      .set("Authorization", `Bearer ${token}`)
      .send({
        car_name: "Honda Civic",
        seats_available: 3,
        monthly_per_person: 1500,
        pickup_points: ["Jaranwala Chowk", "Kohinoor Chowk"],
        destination: "CFD Campus",
        departure_time: "1970-01-01T09:00:00.000Z",
        arrival_time: "1970-01-01T09:30:00.000Z",
        notes: "Jest test offer",
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("offer_id");
    expect(res.body.notes).toBe("Jest test offer");
    expect(res.body.car_name).toBe("Honda Civic");
  });

  it("rejects the request when no auth token is provided", async () => {
    const res = await request(app)
      .post("/offers")
      .send({
        car_name: "Honda Civic",
        seats_available: 3,
        monthly_per_person: 1500,
        pickup_points: ["Jaranwala Chowk"],
        departure_time: "1970-01-01T09:00:00.000Z",
        arrival_time: "1970-01-01T09:30:00.000Z",
      });

    expect(res.status).toBe(401);
  });
});
