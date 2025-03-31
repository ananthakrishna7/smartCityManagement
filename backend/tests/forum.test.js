const mongoose = require("mongoose")
const moment = require("moment")
const request = require("supertest")
const app = require("../app.js")
const ForumPost = require("../models/ForumPost.js")
const Reply = require("../models/Reply.js")

require("dotenv").config()

beforeEach(async () => {
    await mongoose.connect(process.env.MONGO_URI)
})

afterEach(async () => {
    await mongoose.connection.close()
})

describe("GET /forum", () => {
    it("should get all posts available in the database", async () => {
        const post = {
            title: "Test Post",
            content: "This is a test post",
            userId: "67daae42260be8f7cbb71237",
            replies: []
        }
        await ForumPost.create(post)
        const res = await request(app).get("/forum")
        expect(res.status).toBe(200)
        expect(res.body).toContain(post)
        ForumPost.deleteOne({ title: "Test Post", userId: "67daae42260be8f7cbb71237" })
    }
    )
})

describe("POST /forum/create", () => {
    it("should create a new post", async () => {
        const newPost = {
            title: "Test Post",
            content: "This is a test post",
            userId: "67daae42260be8f7cbb71237",
            type: "post"
        }
        await ForumPost.create(newPost)
        const response = await request(app)
            .post("/forum/create")
            .send(newPost)
        expect(response.status).toBe(201)
        expect(response.body.message).toEqual("Post created successfully")
        expect(response.body.post.title).toEqual(newPost.title)
        expect(response.body.post.content).toEqual(newPost.content)
        expect(response.body.post.userId).toEqual(newPost.userId)
        expect(response.body.post.type).toEqual(newPost.type)
        await ForumPost.deleteOne({ title: "Test Post", userId: "67daae42260be8f7cbb71237" })
    })

    it("should return an error if required fields are missing", async () => {
        const newPost = {
            title: "Test Post",
            content: "This is a test post",
            userId: "67daae42260be8f7cbb71237"
        }
        const response = await request(app)
            .post("/forum/create")
            .send(newPost)
        expect(response.status).toBe(400)
        // expect(response.body.message).toBe("Title, content, user ID, and type are required")
    })
})

describe("DELETE /forum/delete", () => {
    it("should delete a post", async () => {
        const post = {
            title: "Test Post",
            content: "This is a test post",
            userId: "67daae42260be8f7cbb71237",
            replies: []
        }
        await ForumPost.create(post)
        const response = await request(app)
            .delete("/forum/delete")
            .send({ id: post._id, userId: post.userId, type: "post" })
        expect(response.status).toBe(200)
        expect(response.body.message).toBe(`Post with ID ${post._id} deleted successfully`)
    })

    it("should return an error if required fields are missing", async () => {
        const post = {
            title: "Test Post",
            content: "This is a test post",
            userId: "67daae42260be8f7cbb71237",
            replies: []
        }
        await ForumPost.create(post)
        const response = await request(app)
            .delete("/forum/delete")
            .send({})
        expect(response.status).toBe(400)
        expect(response.body.message).toBe("Post ID and user ID are required")
    })
})

describe("POST /forum/edit", () => {
    it("should edit a post", async () => {
        const post = {
            title: "Test Post",
            content: "This is a test post",
            userId: "67daae42260be8f7cbb71237",
            replies: []
        }
        await ForumPost.create(post)
        var id = await ForumPost.findOne({ title: "Test Post", userId: "67daae42260be8f7cbb71237" }).lean()._id
        const response = await request(app)
            .post("/forum/edit")
            .send({ id: id, title: "Edited Test Post", content: "This is an edited test post", type: "post" })
        expect(response.status).toEqual(200)
        expect(response.body.message).toEqual(`Post with ID ${post._id} updated successfully`)
        expect(response.body.updatedPost.title).toEqual("Edited Test Post")
        expect(response.body.updatedPost.content).toEqual("This is an edited test post")
        await ForumPost.deleteOne({ title: "Edited Test Post", _id: id })
    })

    it("should return an error if required fields are missing", async () => {
        const post = {
            title: "Test Post",
            content: "This is a test post",
            userId: "67daae42260be8f7cbb71237",
            replies: []
        }
        await ForumPost.create(post)
        const response = await request(app)
            .post("/forum/edit")
            .send({})
        expect(response.status).toBe(400)
        // expect(response.body.message).toBe("Post ID, title, and content are required")
    })
})