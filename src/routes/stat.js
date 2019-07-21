const router = require("express").Router();
const controller = require("../controllers/").postsController;

router.get("/stat", (req, res) => {
  res.json(global.stat);
});

module.exports = router;
