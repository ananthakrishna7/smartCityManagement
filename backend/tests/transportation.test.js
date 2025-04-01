const mongoose = require("mongoose")
const moment = require("moment")
const request = require("supertest")
const app = require("../app.js")
const TransportRoute = require("../models/Transport.js");

require("dotenv").config()

beforeEach(async () => {
    await mongoose.connect(process.env.MONGO_URI)
})

afterEach(async () => {
    await TransportRoute.deleteMany({});
    await mongoose.connection.close()
})

describe("GET /transportation", () => {
    it("should return all transport routes", async () => {
        var routes = await TransportRoute.find({}).lean()
        routes = routes.map(route => ({
            ...route,
            _id: route._id.toString(),
        }));
        const response = await request(app).get("/transportation")
        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual(routes)
    })
})

describe("POST /transportation/add", () => {
    it("should add a new transport route", async () => {
        const newRoute = {
            type: "Bus",
            route: "Route 1",
            time: "10:00 AM",
            fare: "20",
            stops: "Stop 1, Stop 2, Stop 3",
            status: "On Time",
        };

        const response = await request(app)
            .post("/transportation/add")
            .send(newRoute);

        expect(response.status).toBe(201);
        expect(response.body.message).toBe("Route added successfully");
        expect(response.body.newRoute.type).toBe(newRoute.type);
        expect(response.body.newRoute.route).toBe(newRoute.route);
        expect(response.body.newRoute.time).toBe(newRoute.time);
        expect(response.body.newRoute.fare).toBe(newRoute.fare);
        expect(response.body.newRoute.stops).toEqual(newRoute.stops);
        expect(response.body.newRoute.status).toBe(newRoute.status);

        const routeInDb = await TransportRoute.findOne({ route: "Route 1" });
        expect(routeInDb).not.toBeNull();
    });

    it("should return an error if required fields are missing", async () => {
        const incompleteRoute = {
            type: "Bus",
            route: "Route 1",
        };

        const response = await request(app)
            .post("/transportation/add")
            .send(incompleteRoute);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("All fields are required");
    });
});
/*
describe("POST /transportation/routes", () => {
    it("should add a new transport route", async () => {
        const newRoute = {
            routeName: "Test Route",
            startLocation: "Stop 1",
            endLocation: "Stop 3",
            timings: ["08:00 AM", "10:00 AM"],
            realTimeStatus: "On Time"
        }
        const response = await request(app)
            .post("/transportation/routes")
            .send(newRoute)
        expect(response.statusCode).toBe(201)
        expect(response.body.newRoute.routeName).toBe(newRoute.routeName)
        expect(response.body.newRoute.startLocation).toBe(newRoute.startLocation)
        expect(response.body.newRoute.endLocation).toBe(newRoute.endLocation)
        expect(response.body.newRoute.timings).toEqual(newRoute.timings)
        expect(response.body.newRoute.realTimeStatus).toBe(newRoute.realTimeStatus)
        await TransportRoute.deleteOne({ _id: response.body.newRoute._id }).exec()
    })

    it("should return an error if required fields are missing", async () => {
        const newRoute = {
            routeName: "Test Route",
            startLocation: "Stop 1",
        }
        const response = await request(app)
            .post("/transportation/routes")
            .send(newRoute)
        expect(response.statusCode).toBe(400)
    })
})
*/
