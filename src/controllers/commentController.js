const fs = require("fs");
const { readFilePromise, writeFilePromise } = require("../helpers/FilePromise");
const path = require("path");
const fileName = path.join(__dirname, "../../database/data.json");
class commentController {
  async insertComment(req, res) {
    try {
      const { text, title } = req.body;
      const { postId } = req.params;
      const data = await readFilePromise(fileName);
      const jsonData = JSON.parse(data);
      jsonData.comments.push({ text, title, id: uuidv4(), postId });
      const newFile = JSON.stringify(jsonData);
      await writeFilePromise(fileName, newFile);
      res.status(200).end();
    } catch ({ status = 500, message = "Serverside error" }) {
      res.status(status).send(message);
    }
  }

  async getAllComments(req, res) {
    try {
      const data = await readFilePromise(fileName);
      console.log(data);
      const jsonData = JSON.parse(data);
      const foundComments = jsonData.comments.filter(item => item.postId == req.params.postId);
      console.log(foundComments);
      res.json(foundComments);
    } catch (error) {
      res.sendStatus(500);
    }
  }

  async updateComment(req, res) {
    try {
      const { postId, commentId } = req.params;
      const data = await readFilePromise(fileName);
      const jsonData = JSON.parse(data);
      const foundIndex = jsonData.comments.findIndex(item => item.id == commentId && item.postId == postId);
      jsonData.posts[foundIndex] = { ...jsonData.posts[foundIndex], ...req.body };
      await writeFilePromise(fileName, newFile);
      res.status(200).end();
    } catch ({ status = 500, message = "Serverside error" }) {
      res.status(status).send(message);
    }
  }

  async deleteComment(req, res) {
    try {
      const data = await readFilePromise(fileName);
      const jsonData = JSON.parse(data);
      const foundComments = jsonData.comments.filter(item => item.postId == req.params.postId);
      const filteredComments = foundComments.filter(item => item.id != req.params.commentId);
      const newFile = JSON.stringify({ ...jsonData, comments: filteredComments });
      await writeFilePromise(fileName, newFile);
      res.status(200).end();
    } catch (error) {
      res.sendStatus(500);
    }
  }
}

module.exports = () => {
  return new commentController();
};
