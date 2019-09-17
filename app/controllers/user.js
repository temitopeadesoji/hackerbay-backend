const jwt = require("jsonwebtoken");
const config = require("./../../config");

const authenticate = async (req, res) => {
  try {
    const payload = req.body;
    // verify payload
    if (!payload.username || !payload.password) {
      return res.status(400).json({
        status: 2,
        success: false,
        error: "Invalid username or password sent"
      });
    }
    // jwt signing
    const token = await jwt.sign({ id: payload.username }, config.SECRET, {
      expiresIn: "1d"
    });

    res.status(200).json({
      status: 1,
      success: true,
      token
    });
  } catch (error) {
    return res.status(400).json({
      status: 3,
      success: false,
      error
    });
  }
};

// export
module.exports = {
  authenticate
};
