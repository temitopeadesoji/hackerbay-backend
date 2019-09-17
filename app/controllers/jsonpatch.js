const jsonPatch = require("json-patch");

const patchJson = (req, res) => {
  const payload = req.body;
  try {
    // verify payload
    if (!payload.jsonobject || !payload.jsonpatch) {
      return res.status(400).json({
        status: 2,
        success: false,
        error: "Invalid json object or json patch"
      });
    }

    jsonPatch.apply(payload.jsonobject, [payload.jsonpatch]);
    res.status(200).json({
      status: 1,
      success: true,
      json: payload.jsonobject
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: 3,
      success: false,
      error
    });
  }
};

// export
module.exports = {
  patchJson
};
