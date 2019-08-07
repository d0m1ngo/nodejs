const path = require("path");
const { readFilePromise } = require("../helpers/FilePromise");
const fileName = path.join(__dirname, "../../database/data.json");
const fetch = require("node-fetch");
const md5 = require("md5");
const User = require("../models/users");
const mongoose = require("mongoose");

const gravatarApi = md5 => `https://www.gravatar.com/${md5}.json`;

class UsersController {
  async getUserData(req, res) {
    try {
      const userData = await User.findById(req.params.id);
      const md5Data = md5(userData.emailAddress.trim().toLowerCase());
      const gravatarData = await fetch(gravatarApi(md5Data));
      const gravatarDataJson = await gravatarData.json();
      res.json(gravatarDataJson);
    } catch (error) {
      res.sendStatus(500);
    }
  }

  async postUserData(req, res) {
    try {
      await User.create({ _id: mongoose.Types.ObjectId(), emailAddress: "somemeail", name: "somename" });
      res.send(200);
    } catch (error) {
      console.log(error);
      res.send(500);
    }
  }
}

module.exports = () => {
  return new UsersController();
};
