const express = require("express");
const path = require("path");
const rootDir = require("../utils/path");

const router = express.Router();

const users = [];

router.get("/user", (req, res, next) => {
  console.log("User");
  res.render("user", {
    pageTitle: "Add User",
    path: "/user",
    users: users,
  });
});

router.post("/user", (req, res, next) => {
  users.push({ name: req.body.userName });
  console.log(users);
  res.redirect("/");
});

module.exports = router;
