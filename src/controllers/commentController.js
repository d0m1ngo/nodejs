const fs = require("fs");
const path = require("path");
const fileName = path.join(__dirname, "../../database/data.json");
class commentController {
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

  async getAllComments(req, res) {
    fs.readFile(fileName, "utf-8", (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }
      const jsonData = JSON.parse(data);
      const foundComments = jsonData.comments.filter(item => item.postId == req.params.postId);
      res.json(foundComments);
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

  async deleteComment(req, res) {
    fs.readFile(fileName, "utf-8", (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }
      const jsonData = JSON.parse(data);
      const foundComments = jsonData.comments.filter(item => item.postId == req.params.postId);
      const filteredComments = foundComments.filter(item => item.id != req.params.commentId);
      const newFile = JSON.stringify({ ...jsonData, comments: filteredComments });
      fs.writeFile(fileName, newFile, err => {
        if (err) throw err;
        console.log("The file has been saved!");
        res.status(200).end();
      });
    });
  }
}

module.exports = () => {
  return new commentController();
};
