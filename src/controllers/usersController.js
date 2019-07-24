const path = require("path");
const { readFilePromise } = require("../helpers/FilePromise");
const fileName = path.join(__dirname, "../../database/data.json");
const fetch = require("node-fetch");
const md5 = require("md5");

const gravatarApi = md5 => `https://www.gravatar.com/${md5}.json`;

class UsersController {
  async getUserData(req, res) {
    try {
      const data = await readFilePromise(fileName);
      const jsonData = JSON.parse(data);
      const user = jsonData.users.find(item => item.id == req.params.id);
      const md5Data = md5(user.email.trim().toLowerCase());
      const gravatarData = await fetch(gravatarApi(md5Data));
      const gravatarDataJson = await gravatarData.json();
      res.json(gravatarDataJson);
    } catch (error) {
      res.sendStatus(500);
    }
  }
}

module.exports = () => {
  return new UsersController();
};
