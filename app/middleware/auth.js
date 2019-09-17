const jwt = require("jsonwebtoken");
const config = require("./../../config");

const auth = (req, res, next) => {
  if (req.headers.token) {
    jwt.verify(req.headers.token, config.SECRET, (err, decode) => {
      if (err) next(err);
      req.user = decode;
      next();
    });
  } else {
    return res.status(500).json({
      status: 2,
      success: false,
      error: "No header token sent"
    });
  }
};

module.exports = {
  auth
};
