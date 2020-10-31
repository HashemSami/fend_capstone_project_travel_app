import "regenerator-runtime/runtime.js";
import { app, server } from "server";
import db from "mockDB";
const request = require("supertest");
jest.setTimeout(30000);

describe("testing app routes", () => {
  it("should be able to post data to db", async () => {
    const d = new Date();
    const timestamp = d.getTime();
    const response = {
      region: "Middle East",
      country: "Saudi Arabia",
      city: "Riyadh",
      date: timestamp,
    };

    await request(app).post("/post-data").send(response);

    const res = await request(app).get("/get-data");
    expect(res.status).toBe(200);
    expect(res.body).toEqual(db);
  });

  it("should be able to get db", async () => {
    const res = await request(app).get("/get-data");

    expect(res.status).toBe(200);
    expect(res.body).toEqual(db);
  });
});
