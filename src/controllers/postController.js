const AbstractController = require("./abstractController.js");

class PostController extends AbstractController {
  async insertPost(req, res) {
    try {
      const { title, text, userId } = req.body;
      await this.postsModel.create({
        title,
        text,
        userId
      });
      res.status(200);
    } catch ({ status = 500, message = "Serverside error" }) {
      res.status(status).send(message);
    }
  }

  async getAllPosts(req, res) {
    try {
      const posts = await this.postsModel.findAll();
      res.status(200).json(posts);
    } catch ({ status = 500, message = "Serverside error" }) {}
    res.status(status).send(message);
  }

  async updatePost(req, res) {
    try {
      const { postId } = req.params;
      const { title, text } = req.body;
      const updatedPost = await this.postsModel.update({ title, text }, { where: { id: postId } });
      res.status(200).json(updatedPost);
    } catch ({ status = 500, message = "Serverside error" }) {
      res.status(status).send(message);
    }
  }

  async deletePost(req, res) {
    try {
      const { postId } = req.params;
      await this.postsModel.destroy({ where: { id: postId } });
      res.status(200);
    } catch ({ status = 500, message = "Serverside error" }) {
      res.status(status).send(message);
    }
  }
}

module.exports = Models => {
  return new PostController(Models);
};
