module.exports = {
  postsController: require("../controllers/postController")(),
  commentController: require("../controllers/commentController")(),
  usersController: require("../controllers/usersController")()
};
