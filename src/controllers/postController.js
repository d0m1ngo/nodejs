const fs = require("fs");
const path = require("path");
const { readFilePromise, writeFilePromise } = require("../helpers/FilePromise");
const fileName = path.join(__dirname, "../../database/data.json");
const uuidv4 = require("uuid/v4");

class PostController {
  async insertPost(req, res) {
    try {
      const { text, title } = req.body;
      const data = await readFilePromise(fileName);
      const jsonData = JSON.parse(data);
      jsonData.posts.push({ text, title, id: uuidv4() });
      const newFile = JSON.stringify(jsonData);
      await writeFilePromise(fileName, newFile);
      res.status(200).end();
    } catch (error) {
      res.sendStatus(500);
    }
  }

  async getAllPosts(req, res) {
    try {
      const data = await readFilePromise(fileName);
      const jsonData = JSON.parse(data);
      res.json(jsonData.posts);
    } catch (error) {
      res.sendStatus(500);
    }
  }

  async updatePost(req, res) {
    try {
      const data = await readFilePromise(fileName);
      const jsonData = JSON.parse(data);
      const foundIndex = jsonData.posts.findIndex(item => item.id == req.params.postId);
      jsonData.posts[foundIndex] = { ...jsonData.posts[foundIndex], ...req.body };
      const newFile = JSON.stringify(jsonData);
      await writeFilePromise(fileName, newFile);
      res.status(200).end();
    } catch (error) {
      res.sendStatus(500);
    }
  }

  async deletePost(req, res) {
    try {
      const data = await readFilePromise(fileName);
      const jsonData = JSON.parse(data);
      const foundPosts = jsonData.posts.filter(item => item.id != req.params.postId);
      const newFile = JSON.stringify({ ...jsonData, posts: foundPosts });
      await writeFilePromise(fileName, newFile);
      res.status(200).end();
    } catch (error) {
      res.sendStatus(500);
    }
  }
}

module.exports = () => {
  return new PostController();
};
