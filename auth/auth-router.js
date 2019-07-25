const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/secret");
const { add, findBy } = require("../users/users-model");
const route = express.Router();

route.post("/register", async (req, res) => {
  try {
    const user = req.body;
    const { username } = req.body;
    user.password = bcrypt.hashSync(user.password, 12);
    const userExists = await findBy({ username });
    if (userExists) {
      res.status(409).json({
        message: "User already exists"
      });
    } else {
      const successfulRegister = await add(user);
      res.status(201).json({ successfulRegister });
    }
  } catch (err) {
    res.status(500).json({
      error: "Internal error, please try again later"
    });
  }
});

route.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const userExists = await findBy({ username });
    if (userExists && bcrypt.compareSync(password, userExists.password)) {
      const token = generateToken(userExists);
      res
        .set({ "Set-Cookie": `token=${token}` })
        .status(200)
        .json({ user: userExists, token });
    } else {
      res.status(404).json({
        message: "User with the username already exists"
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "Internal server error"
    });
  }
});

const generateToken = user => {
  const payload = {
    sub: user.id,
    username: user.username,
    department: user.department
  };
  const options = {
    expiresIn: "1d"
  };
  return jwt.sign(payload, jwtSecret, options);
};

module.exports = route;
