const router = require("express").Router();
const controller = require("../controllers/").postsController;

router.post("/", controller.insertPost);
router.get("/", controller.getAllPosts);
router.put("/:postId", controller.updatePost);
router.delete("/:postId", controller.deletePost);

module.exports = router;
