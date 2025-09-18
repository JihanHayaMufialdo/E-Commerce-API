const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

const register = async (req, res) => {
  try {
    const { userName, userEmail, userPassword, userRole } = req.body;

    const hashedUserPassword = await bcrypt.hash(userPassword, 10);

    const user = await prisma.user.create({
      data: {
        userName,
        userEmail,
        userPassword: hashedUserPassword,
        userRole: userRole || "USER",
      },
    });

    res.json({ message: "User registered", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { userEmail, userPassword } = req.body;

    const user = await prisma.user.findUnique({ where: { userEmail } });
    if (!user) return res.status(400).json({ error: "User not found" });

    const valid = await bcrypt.compare(userPassword, user.userPassword);
    if (!valid) return res.status(400).json({ error: "Invalid userPassword" });

    const token = jwt.sign(
      { id: user.id, userRole: user.userRole },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ message: "Login success", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { register, login };
