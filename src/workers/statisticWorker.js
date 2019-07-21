const { parentPort, workerData } = require("worker_threads");
const statisticsHelper = require("../helpers/statistics");
const path = require("path");
const fileName = path.join(__dirname, "../../database/data.json");
const { readFilePromise, writeFilePromise } = require("../helpers/FilePromise");

readFilePromise(fileName)
  .then(data => {
    const jsonData = JSON.parse(data);
    const statResult = statisticsHelper(jsonData.comments);
    console.log(statResult);
    parentPort.postMessage(statResult);
  })
  .catch(err => console.log(err));
