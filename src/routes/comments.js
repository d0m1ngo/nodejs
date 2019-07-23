const router = require("express").Router();
const controller = require("../controllers/").commentController;

router.post("/:postId/comments/", controller.insertComment);
router.get("/:postId/comments", controller.getAllComments);
router.put("/:postId/comments/:commentId", controller.updateComment);
router.delete("/:postId/comments/:commentId", controller.deleteComment);

module.exports = router;
