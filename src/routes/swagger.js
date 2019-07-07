const router = require("express").Router();
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const path = require("path");

const swaggerDocument = YAML.load(path.join(__dirname, "../../swagger.yaml"));

router.use("/api/v1/", swaggerUi.serve);
router.get("/api/v1/", swaggerUi.setup(swaggerDocument));

module.exports = router;
