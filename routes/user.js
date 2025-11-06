const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const userController = require("../controller/user.js");

router
  .route("/signup")
  .get((req, res) => {
    res.render("users/signup.ejs");
  })
  .post(wrapAsync(userController.renderSignupForm));

router
  .route("/login")
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    wrapAsync(userController.renderLoginForm)
  )
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    userController.login
  );

router.get("/login", (req, res) => {
  res.render("users/login.ejs");
});
router.get("/logout", userController.logout);

module.exports = router;
