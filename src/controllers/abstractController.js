class AbstractController {
  constructor(Models) {
    this.DB = Models.sequelize;
    this.Op = this.DB.Sequelize.Op;

    this.commentsModel = Models.Comments;
    this.postsModel = Models.Posts;
  }
}

module.exports = AbstractController;
