const mongoose = require("mongoose")
const moment = require("moment")
const request = require("supertest")
const app = require("../app.js")
const UserModel = require("../models/User.js");

require("dotenv").config()

beforeEach(async() => {
    await mongoose.connect(process.env.MONGO_URI)
})

afterEach(async() => {
    await mongoose.connection.close()
})

describe('check if admin exists', () => {
    it("should have at least one admin record", async () =>{
        const admin = await UserModel.findOne({role: 'admin'})
        expect(admin).toBeDefined()
    })
})

describe("POST /auth/login", () => {
    it("should login with correct credentials", async() => {
        const user = {name: "Test User",
            email: "tester2@ex.com",
            password: "password",
            role: "user"}
        UserModel.create(user);
        const response = await request(app)
            .post("/auth/login")
            .send(user)
        expect(response.statusCode).toBe(200)
        expect(response.body.message).toBe("Login successful")
        await UserModel.deleteOne({ email: user.email }).exec()
    })
})

describe("POST /auth/register", () => {
    it("should register a new user", async() => {
        const newUser = {
            name: "Test User",
            email: "te1@ex.com",
            password: "password",
            role: "user"
        }
        const response = await request(app)
            .post("/auth/register")
            .send(newUser)
        expect(response.statusCode).toBe(201)
        expect(response.body.message).toBe("User registered successfully")

        // Clean up
        await UserModel.deleteOne({ email: newUser.email }).exec()
    })
})

