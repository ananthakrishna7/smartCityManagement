const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app"); // Import your Express app
const Grievance = require("../models/Grievance");
const moment = require("moment");

require("dotenv").config();

<<<<<<< HEAD
// Test data
const testUserId = new mongoose.Types.ObjectId(); // Generate a test user ID
const testGrievance = {
  userId: testUserId,
  title: "Test Grievance",
  description: "This is a test grievance",
  severity: "Low",
};

// Connect to the test database before running tests
beforeEach(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// Clear the database after each test
afterEach(async () => {
  await Grievance.deleteMany();
});

// Disconnect from the database after all tests are done
afterAll(async () => {
  await mongoose.connection.close();
});

describe("Grievance Routes", () => {
  // Test POST /submit
  describe("POST /submit", () => {
    it("should submit a new grievance", async () => {
      const response = await request(app)
        .post("/grievances/submit")
        .send(testGrievance);

      expect(response.statusCode).toBe(201);
      expect(response.body.message).toBe("Grievance submitted successfully");
      expect(response.body.newGrievance.title).toBe(testGrievance.title);
      expect(response.body.newGrievance.description).toBe(
        testGrievance.description
      );
      expect(response.body.newGrievance.severity).toBe(testGrievance.severity);

      // Clean up
      await Grievance.deleteOne({ _id: response.body.newGrievance._id }).exec();
    });

    it("should return 400 if required fields are missing", async () => {
      const response = await request(app).post("/grievances/submit").send({});

      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe("All fields are required");
    });
  });

  // Test GET /
  describe("GET /", () => {
    it("should fetch all grievances", async () => {
      // Insert a test grievance
      const grievance = await Grievance.create(testGrievance);

      const response = await request(app).get("/grievances");

      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBe(1);
      expect(response.body[0].title).toBe(grievance.title);
      expect(response.body[0].description).toBe(grievance.description);
      expect(response.body[0].severity).toBe(grievance.severity);
    });
  });

  // Test GET /user/:userId
  describe("GET /user/:userId", () => {
    it("should fetch grievances for a specific user", async () => {
      // Insert a test grievance
      const grievance = await Grievance.create(testGrievance);

      const response = await request(app).get(`/grievances/user/${testUserId}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBe(1);
      expect(response.body[0].title).toBe(grievance.title);
      expect(response.body[0].description).toBe(grievance.description);
      expect(response.body[0].severity).toBe(grievance.severity);
    });

    it("should return 400 if userId is missing", async () => {
      const response = await request(app).get("/grievances/user/");

      expect(response.statusCode).toBe(404); // 404 because the route is not found
    });
  });

  // Test PUT /resolve/:id
  describe("PUT /resolve/:id", () => {
    it("should update the status of a grievance", async () => {
      // Insert a test grievance
      const grievance = await Grievance.create(testGrievance);

      const response = await request(app)
        .put(`/grievances/resolve/${grievance._id}`)
        .send({ status: "Resolved" });

      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe("Grievance updated");
      expect(response.body.updatedGrievance.status).toBe("Resolved");

      // Clean up
      await Grievance.deleteOne({ _id: grievance._id }).exec();
    });

    it("should return 400 if status is missing", async () => {
      // Insert a test grievance
      const grievance = await Grievance.create(testGrievance);

      const response = await request(app)
        .put(`/grievances/resolve/${grievance._id}`)
        .send({});

      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe("Status is required");

      // Clean up
      await Grievance.deleteOne({ _id: grievance._id }).exec();
    });

    it("should return 404 if grievance is not found", async () => {
      const nonExistentId = new mongoose.Types.ObjectId();

      const response = await request(app)
        .put(`/grievances/resolve/${nonExistentId}`)
        .send({ status: "Resolved" });

      expect(response.statusCode).toBe(404);
      expect(response.body.message).toBe("Grievance not found");
    });
  });
});
=======
beforeEach(async () => {
    await mongoose.connect(process.env.MONGO_URI)
})

afterEach(async () => {
    await mongoose.connection.close()
})

describe("GET /cityservices", () => {
    it("should return all grievances available in the database", async () => {
        const grievances = await Grievance.find({}).lean()
        const normalizedGrievances = grievances.map((grievance) => {
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
>>>>>>> 346d7549729aab6c33335e66a82aa97944afa186
