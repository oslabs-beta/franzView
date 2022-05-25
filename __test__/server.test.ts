import request from "supertest";
// import app from '../src/server/server'

const server = "http://localhost:3000";

describe("REST Server", () => {
  describe("404s for non-existant routes", () => {
    it("Bad GET Request", () => {
      return request(server).get("/badRoute").expect(404);
    });

    it("Bad POST Request", () => {
      return request(server).post("/badRoute").expect(404);
    });

    it("Bad PUT Request", () => {
      return request(server).put("/badRoute").expect(404);
    });

    it("Bad DELETE Request", () => {
      return request(server).delete("/badRoute").expect(404);
    });
  });
});
