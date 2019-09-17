"use strict";

// Import All Controllers
const { authenticate } = require("./user");
const { patchJson } = require("./jsonpatch");
const { thumbnailGenerator } = require("./thumbnail-generator");

module.exports = function(app, auth) {
  app
    //End Points
    .post("/api/authenticate", authenticate)
    .post("/api/jsonpatch", auth, patchJson)
    .post("/api/generate-thumbnail", auth, thumbnailGenerator);
};
