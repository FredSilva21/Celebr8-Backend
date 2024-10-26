const express = require("express");
const router = express.Router();
const CategoryCostController = require("../controllers/category.controller");
const CategoryEventController = require("../controllers/category.controller");
const {verifyUser} = require("../Middleware/jwt");

router
.post("/categories/costs",verifyUser,CategoryCostController.createCategoryCost)
.put("/categories/costs/:categoryId",verifyUser,CategoryCostController.editCategoryCost)

router
.post("/categories/events",verifyUser,CategoryEventController.createCategoryEvent)
.put("/categories/events/:categoryId",verifyUser,CategoryEventController.editCategoryEvent)

module.exports = router;