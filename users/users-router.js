const express = require("express");
const restricted = require("../auth/restricted");
const { findByDept } = require("./users-model");

const route = express.Router();

route.get("/", restricted, async (req, res) => {
  try {
    const users = await findByDept({ department: req.department });
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({
      error: "Internal server error"
    });
  }
});

modules.exports = route;
