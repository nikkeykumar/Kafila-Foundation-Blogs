const userModel = require("../models/user.model");
const tokenBlacklistModel = require("../models/tokenBlacklistModel");
const jwt = require("jsonwebtoken");

// 🔐 auth middleware
async function authMiddleware(req, res, next) {
  try {
    // ✅ only header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Authorization token missing",
      });
    }

    const token = authHeader.split(" ")[1];

    // blacklist check
    const isBlacklisted = await tokenBlacklistModel.findOne({ token });
    if (isBlacklisted) {
      return res.status(401).json({
        message: "Token is blacklisted",
      });
    }

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "Unauthorized access, invalid token",
    });
  }
}

// 🔐 admin middleware
function adminMiddleware(req, res, next) {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Access denied, admin only",
    });
  }

  next();
}

module.exports = { authMiddleware, adminMiddleware };
