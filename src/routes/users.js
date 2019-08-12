const router = require("express").Router();
const controller = require("../controllers/").usersController;

router.get("/:id", controller.getUserData);

module.exports = router;
