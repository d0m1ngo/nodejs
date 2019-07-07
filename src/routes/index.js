const controllers = require('../controllers');

module.exports = {
  postRoute: require('./post')(controllers.postController),
};
