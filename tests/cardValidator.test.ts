import request from "supertest";
import app from "../src/app";

describe("POST /api/validate-card", () => {
    it("should return valid for a valid card number", async () => {
        const response = await request(app)
            .post("/api/validate-card")
            .send({
                cardNumber: "4111 1111 1111 1111"
            });

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data.isValid).toBe(true);
    });

    it("should return bad request for missing card number", async () => {
        const response = await request(app)
            .post("/api/validate-card")
            .send({});

        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
        expect(response.body.data.isValid).toBe(false);
    });

    it("should return invalid for wrong card number", async () => {
        const response = await request(app)
            .post("/api/validate-card")
            .send({
                cardNumber: "1234567890123456"
            });

        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
        expect(response.body.data.isValid).toBe(false);
    });
});