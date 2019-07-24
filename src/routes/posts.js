const router = require("express").Router();
const controller = require("../controllers/").postsController;

router.post("/posts", controller.insertPost);
router.get("/posts", controller.getAllPosts);
router.put("/posts/:postId", controller.updatePost);
router.delete("/posts/:postId", controller.deletePost);

module.exports = router;
