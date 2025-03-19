const mongoose = require("mongoose")
const moment = require("moment")
const request = require("supertest")
const app = require("../app")
const AnnouncementModel = require("../models/Announcement.js");

require("dotenv").config()

beforeEach(async() => {
    await mongoose.connect(process.env.MONGO_URI)
})

afterEach(async() => {
    await mongoose.connection.close()
})

describe("GET /announcements", () => {
    it("should return all announcements", async() => {
        var announcements = await AnnouncementModel.find({}).lean()
        const normalizedAnnouncements = announcements.map(announcement => {
            return {
                ...announcement,
                _id: announcement._id.toString(),
                date: moment(announcement.date).format("YYYY-MM-DD")
            }
        })
        const response = await request(app).get("/announcements")
        
        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual(normalizedAnnouncements)
    })
})