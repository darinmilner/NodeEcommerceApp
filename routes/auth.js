const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { check, body } = require("express-validator/check");
const User = require("../models/user");

const validEmailMsg = "Please enter a valid email address";

router.get("/login", authController.getLogin);
router.get("/signup", authController.getSignup);
router.post(
  "/login",
  check("email").isEmail().withMessage(validEmailMsg).normalizeEmail(),
  body("password", "Please enter a password of at least five characters")
    .isLength({
      min: 5,
    })
    .trim(),
  authController.postLogin
);
router.post(
  "/signup",
  [
    check("email")
      .isEmail()
      .withMessage(validEmailMsg)
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            //User with email exists
            return Promise.reject("Email already exists");
          }
        });
      })
      .normalizeEmail(),
    body("password", "Please enter at least five valid numbers and characters")
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim(),
    body("confirmPassword")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords must match");
        }
        return true;
      }),
  ],
  authController.postSignup
);
router.post("/logout", authController.postLogout);
router.get("/reset", authController.getReset);
router.post("/reset", authController.postReset);
router.get("/reset/:token", authController.getNewPassword);
router.post("/new-password", authController.postNewPassword);

module.exports = router;
