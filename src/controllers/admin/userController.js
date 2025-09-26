const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        userName: true,
        userEmail: true,
        userRole: true,
        createdAt: true,
      },
    });
    res.json({message: "Request success", users});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getUsers };
