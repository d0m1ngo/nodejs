const router = require("express").Router();
const controller = require("../controllers/").usersController;

router.get("/:id", controller.getUserData);
router.post("/", controller.postUserData);


module.exports = router;
