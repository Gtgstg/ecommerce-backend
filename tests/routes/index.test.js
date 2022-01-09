const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const request = require('supertest');
const app = require('../../app');

test("GET /", async () => {
    await request(app).get("/")
        .expect(200)
        .then((response) => {
            // Check length
            expect(response.text.length).toBeGreaterThan(0);

            // Check title
            const title = new JSDOM(response.text).window.document.querySelector("title").textContent;
            expect(title).toEqual("Ecommerce");
        });
});