const jwt = require('jsonwebtoken');

function generateAccessToken(id) {
    const payload = { id };
    return jwt.sign(payload, process.env.SECRET, { expiresIn: "180d" });
}

module.exports = generateAccessToken;
