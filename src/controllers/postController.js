const fs = require("fs");
const path = require("path");
const fileName = path.join(__dirname, "../../database/data.json");
const uuidv4 = require("uuid/v4");

class PostController {
  async insertPost(req, res) {
    fs.readFile(fileName, "utf-8", (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }
      const jsonData = JSON.parse(data);
      const { text, title } = req.body;
      jsonData.posts.push({ text, title, id: uuidv4() });
      const newFile = JSON.stringify(jsonData);
      fs.writeFile(fileName, newFile, err => {
        if (err) throw err;
        console.log("The file has been saved!");
        res.status(200).end();
      });
    });
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
    fs.readFile(fileName, "utf-8", (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }
      const jsonData = JSON.parse(data);
      const foundIndex = jsonData.posts.findIndex(item => item.id == req.params.postId);
      jsonData.posts[foundIndex] = {...jsonData.posts[foundIndex], ...req.body};
      const newFile = JSON.stringify(jsonData);
      fs.writeFile(fileName, newFile, err => {
        if (err) throw err;
        console.log("The file has been saved!");
        res.status(200).end();
      });
    });
  }

  async deletePost(req, res) {
    fs.readFile(fileName, "utf-8", (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }
      const jsonData = JSON.parse(data);
      const foundPosts = jsonData.posts.filter(item => item.id != req.params.postId);
      const newFile = JSON.stringify({ ...jsonData, posts: foundPosts });
      fs.writeFile(fileName, newFile, err => {
        if (err) throw err;
        console.log("The file has been saved!");
        res.status(200).end();
      });
    });
  }
}

module.exports = () => {
  return new PostController();
};
