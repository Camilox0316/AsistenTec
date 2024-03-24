const jwt = require("jsonwebtoken");
const { TOKEN_SECRET } = require("../config/config.js");

const authRequire = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }
  jwt.verify(token, TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ msg: "Token is not valid" });
    }
    console.log(decoded);
    req.user = decoded;
  });
  next();
};

module.exports = { authRequire };
