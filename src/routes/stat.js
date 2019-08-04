const router = require("express").Router();
const controller = require("../controllers/").postsController;

router.get("/", (req, res) => {
  res.json(global.stat);
});

module.exports = router;
