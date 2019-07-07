process.env["NODE_CONFIG_DIR"] = __dirname + "/config/";
const express = require("express");
const { join } = require("path");
const cors = require("cors");
const config = require("config");
const swagger = require("./routes/swagger.js");
const path = tail => join(__dirname, tail);
const port = config.get("port");

const router = express.Router().use("/", swagger);

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
  //   .use((req, res) => res.sendFile(path('../public/index.html')))
  .listen(port, () => {
    console.log(`Listening on :${port}`);
  });

module.exports = { service };
