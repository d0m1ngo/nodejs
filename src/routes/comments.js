const router = require("express").Router();

router.post("/posts/:postId/comments/", controller.insertComment);
router.get("/posts/:postId/comments", controller.getAllComments);
router.put("/posts/:postId/comments/:commentId", controller.changeComment);
router.put("/posts/:postId/comments/:commentId", controller.deleteComment);
