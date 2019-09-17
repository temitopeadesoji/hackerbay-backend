const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");

const log = require("./logger");

app
  .use("/public", express.static("public"))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(morgan("combined", { stream: log.stream }));

// Import App Middlewares
const { auth } = require("./app/middleware/auth");

// Import App Controller
require("./app/controllers/main")(app, auth);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  log.debug(`APP STARTED RUNNNING ON ${port}`);
});

module.exports = app; // for testing
