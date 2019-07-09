const Models = require("../models");

module.exports = {
  postsController: require("../controllers/postController")(Models)
};
