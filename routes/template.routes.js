const express = require("express");
const router = express.Router();
const TemplateController = require("../controllers/template.controller");
const { verifyUser, verifySameUser } = require("../Middleware/jwt");

router
  .get(
    "/users/:userId/templates/tasks",
    verifyUser,
    verifySameUser,
    TemplateController.getAllUserTasksTemplates
  )
  .post(
    "/users/:userId/templates/tasks",
    verifyUser,
    verifySameUser,
    TemplateController.createTaskTemplate
  );

// router.get(
//   "/users/:userId/templates/costs",
//   verifyUser,
//   verifySameUser,
//   TemplateController.getAllUserCostsTemplates
// );

// router.post(
//   "/users/:userId/templates/tasks",
//   verifyUser,
//   verifySameUser,
//   TemplateController.createTaskTemplate
// );

// router.post(
//   "/users/:userId/templates/costs",
//   verifyUser,
//   verifySameUser,
//   TemplateController.createCostTemplate
// );
module.exports = router;
