const fs = require("fs");
const path = require("path");
const fileName = path.join(__dirname, "../../database/data.json");
class PostController {
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
    fs.readFile(fileName, "utf-8", (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }
      const jsonData = JSON.parse(data);
      res.json(jsonData.posts);
    });
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

module.exports = () => {
  return new PostController();
};
