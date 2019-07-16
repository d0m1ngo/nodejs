const router = require("express").Router();
const controller = require("../controllers/").commentController;

// router.post("/posts/:postId/comments/", controller.insertComment);
router.get("/posts/:postId/comments", controller.getAllComments);
// router.put("/posts/:postId/comments/:commentId", controller.changeComment);
router.delete("/posts/:postId/comments/:commentId", controller.deleteComment);

module.exports = router;
