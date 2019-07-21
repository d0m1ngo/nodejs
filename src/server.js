const express = require("express");
const { join } = require("path");
const cors = require("cors");
const swagger = require("./routes/swagger.js");
const path = tail => join(__dirname, tail);
const posts = require("./routes/posts");
const comments = require("./routes/comments");
const stat = require("./routes/stat");
const router = express.Router().use("/", swagger);
const worker = require("./services/freqWorker");

worker();
const service = express()
  .use("/meta/health", (req, res) => res.sendStatus(200))
  .use(cors())
  .use(express.json())
  .use(
    express.urlencoded({
      extended: false
    })
  )
  .use("/", router)
  .use("/posts", posts)
  .use("/comments", comments)
  .use("/stat", stat)
  //   .use((req, res) => res.sendFile(path('../public/index.html')))
  .listen(3000, () => {
    console.log(`Listening on : 3000`);
  });

module.exports = { service };
