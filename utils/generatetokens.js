const jwt = require("jsonwebtoken");

const generateToken = (id) => {
    return jwt.sign({ id }, "secretkey123", {
        expiresIn: "7d"
    });
};

module.exports = generateToken;