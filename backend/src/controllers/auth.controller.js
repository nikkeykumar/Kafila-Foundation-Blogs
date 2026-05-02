const userModel = require("../models/user.model");
const tokenBlacklistModel = require("../models/tokenBlacklistModel");
const jwt = require("jsonwebtoken");

/**
 *  @desc    Register a new user
 *  @route   POST /api/auth/register
 *  @access  Public
 */
const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // check existing user
    const isemailExists = await userModel.findOne({ email });
    if (isemailExists) {
      return res.status(422).json({
        message: "User already exists with this email",
        status: false,
      });
    }

    // create user
    const user = await userModel.create({ email, password, name });

    // create token ( role add)
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "3d" },
    );

   
    res.status(201).json({
      token, // token in response for frontend storage (optional if using cookies)
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      status: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, status: "false" });
  }
};

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  Public
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check user
    const isuser = await userModel.findOne({ email }).select("+password");
    if (!isuser) {
      return res.status(401).json({
        message: "User not found",
        status: false,
      });
    }

    // check password
    const isValidPass = await isuser.comparePassword(password);
    if (!isValidPass) {
      return res.status(401).json({
        message: "Invalid password",
        status: false,
      });
    }

    // create token (🔥 role add)
    const token = jwt.sign(
      { userId: isuser._id, role: isuser.role },
      process.env.JWT_SECRET,
      { expiresIn: "3d" },
    );

    
    res.status(200).json({
      token, // 🔥 token in response for frontend storage (optional if using cookies)
      user: {
        _id: isuser._id,
        email: isuser.email,
        name: isuser.name,
        role: isuser.role,
      },
      status: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, status: "false" });
  }
};

/**
 * @desc    Logout user
 * @route   POST /api/auth/logout
 * @access  Private
 */
const logout = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(400).json({
        message: "Token missing",
        status: false,
      });
    }

    const token = authHeader.split(" ")[1];

    // 🔥 blacklist token
    await tokenBlacklistModel.create({ token });

    res.status(200).json({
      message: "Logout successfully",
      status: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
      status: false,
    });
  }
};

/**
 * @desc    Get current user
 * @route   GET /api/auth/me
 * @access  Private
 */
const getme = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.userId);
    res.status(200).json({
      user,
      status: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: false,
    });
  }
};

module.exports = {
  register,
  login,
  logout,
  getme,
};
