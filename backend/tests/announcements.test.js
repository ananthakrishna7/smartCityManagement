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

describe("POST /announcements/add", () => {
    it("should add a new announcement", async() => {
        const newAnnouncement = {
            title: "Test Announcement",
            description: "This is a test announcement",
            type: "info"
        }
        const response = await request(app)
            .post("/announcements/add")
            .send(newAnnouncement)
        
        expect(response.statusCode).toBe(201)
        expect(response.body.message).toBe("Announcement created successfully")
        expect(response.body.newAnnouncement.title).toBe(newAnnouncement.title)
        expect(response.body.newAnnouncement.description).toBe(newAnnouncement.description)
        expect(response.body.newAnnouncement.type).toBe(newAnnouncement.type)
        
        // Clean up 
        await AnnouncementModel.deleteOne({ _id: response.body.newAnnouncement._id }).exec()
    })
    
    it("should return an error if required fields are missing", async() => {
        const newAnnouncement = {
            title: "Test Announcement",
            description: "This is a test announcement"
        }
        const response = await request(app)
            .post("/announcements/add")
            .send(newAnnouncement)
        
        expect(response.statusCode).toBe(400)
        expect(response.body.error).toBe("All fields are required")
    })
})

describe("DELETE /announcements/delete/:id", () => {
    it("should delete an announcement by ID", async() => {
        const newAnnouncement = new AnnouncementModel({
            title: "Test Announcement",
            description: "This is a test announcement",
            type: "info"
        })
        await newAnnouncement.save()
        
        const response = await request(app).delete(`/announcements/delete/${newAnnouncement._id}`)
        expect(response.statusCode).toBe(200)
        expect(response.body.message).toBe("Announcement deleted successfully")
    })
    
    it("should return an error if announcement does not exist", async() => {
        const response = await request(app).delete("/announcements/delete/67daae42260be8f7cbb71237")
        expect(response.statusCode).toBe(404)
        expect(response.body.error).toBe("Announcement not found")
    })
})