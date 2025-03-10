const express = require("express");
const router = express.Router();
const transportController = require("../controllers/tranportationController");

router.get("/routes", transportController.getAllRoutes);
router.get("/routes/:id", transportController.getRouteById);
router.post("/routes", transportController.addRoute);
router.put("/routes/:id", transportController.updateRoute);
router.delete("/routes/:id", transportController.deleteRoute);

module.exports = router;
