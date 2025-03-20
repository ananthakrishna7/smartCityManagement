const mongoose = require("mongoose")
const moment = require("moment")
const request = require("supertest")
const app = require("../app.js")
const Grievance = require("../models/Grievance.js")

require("dotenv").config()

beforeEach(async() => {
    await mongoose.connect(process.env.MONGO_URI)
})

afterEach(async() => {
    await mongoose.connection.close()
})

describe("GET /cityservices", () => {
    it("should return all grievances available in the database", async () =>{
        const grievances = await Grievance.find({}).lean()
        const normalizedGrievances = grievances.map((grievance)=>{
              return {
                ...grievance,
                userId: grievance.userId.toString(),
                _id: grievance._id.toString(),
                createdAt: moment(grievance.createdAt).format("YYYY-MM-DD")
              }
            })
        const response = request("app").get("/cityservices")
        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual(normalizedGrievances)
    })
})