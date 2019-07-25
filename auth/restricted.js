const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/secret");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, jwtSecret, (err, decodeToken) => {
      if (err) {
        res.status(401).json({ message: "You can't enter" });
      } else {
        req.department = decodeToken.department;
        next();
      }
    });
  } else {
    res.status(401).json({ message: "Cannot enter" });
  }
};
