const jwt = require("jsonwebtoken");
const { TOKEN_SECRET } = require("../config/config.js");
function createAccessToken(payload) {
  console.log("Payload:", payload); // Agregar esta línea para depuració
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      TOKEN_SECRET,
      {
        expiresIn: "1d",
      },

      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
}

module.exports = { createAccessToken };
