const router = require("express").Router();
const controller = require("../controllers/").usersController;

router.post("/", controller.insertUser);
router.get("/", controller.getAllUsers);
// router.put("/:userId", controller.updateUser);
// router.delete("/:userId", controller.deleteUser);

module.exports = router;
