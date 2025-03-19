const mongoose = require("mongoose")
const moment = require("moment")
const request = require("supertest")
const app = require("../app.js")
const TransportRoute = require("../models/TransportRoute.js");
const { deserializeUser } = require("passport");

require("dotenv").config()

beforeEach(async() => {
    await mongoose.connect(process.env.MONGO_URI)
})

afterEach(async() => {
    await mongoose.connection.close()
})

describe("GET /transportation/routes", () => {
    it("should return all transport routes", async() => {
        var routes = await TransportRoute.find({}).lean()
        routes = routes.map(route => ({
            ...route,
            _id: route._id.toString(),
        }));
        const response = await request(app).get("/transportation/routes")
        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual(routes)
    })
})

describe("POST /transportation/routes", () => {
    it("should add a new transport route", async() => {
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
    
    it("should return an error if required fields are missing", async() => {
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

