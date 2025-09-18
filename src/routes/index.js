const express = require("express");
const { register, login } = require("../controllers/authController");
const { getUsers } = require("../controllers/userController");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/", (req, res) => {
  res.send("E-Commerce API running with Prisma 🚀");
});

router.get("/users",  authMiddleware(["ADMIN"]), getUsers);

router.get("/protected", authMiddleware(["ADMIN"]), (req, res) => {
  res.json({ message: "Welcome Admin!", user: req.user });
});

module.exports = router;
