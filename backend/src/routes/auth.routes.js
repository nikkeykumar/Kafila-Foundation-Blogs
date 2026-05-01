const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const middlewere = require("../middlewere/auth.middleware");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", middlewere.authMiddleware, authController.logout);
router.get("/me", middlewere.authMiddleware, authController.getme);

module.exports = router;
