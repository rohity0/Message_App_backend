const jwt = require("jsonwebtoken");
const { commonErrorHandling } = require("../utils/error-response");
require("dotenv").config();
const screatKey = process.env.SECRET;

const validateUser = (req, res, next) => {
  try {
    let { authorization } = req.headers;
    if (authorization) {
      let { userId } = jwt.verify(authorization, screatKey);
      req.params.userId = userId ? userId : null;
      next();
    } else {
      commonErrorHandling(401, "User is not login");
    }
  } catch (err) {
    res.status(401).send(err);
  }
};

module.exports = {
  validateUser,
};
