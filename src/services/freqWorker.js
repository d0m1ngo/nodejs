const { Worker, MessageChannel } = require("worker_threads");
// const fileName = path.join(__dirname, "../../database/data.json");
const CronJob = require("cron").CronJob;

module.exports = () => {
  new CronJob(
    "* * * * *",
    function() {
      console.log("You will see this message every minute");
      const worker = new Worker(`${__dirname}/../workers/statisticWorker.js`);
      worker.on("message", msg => {
        global.stat = msg;
      });
    },
    null,
    true,
    null,
    null,
    true
  );
};
