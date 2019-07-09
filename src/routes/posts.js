const router = require('express').Router();


router.post('/posts', controller.insertPost);
router.get('/posts', controller.getAllPosts);
router.put('/posts/:postId', controller.updatePost);
router.delete('/posts/:postId', controller.deletePost);
