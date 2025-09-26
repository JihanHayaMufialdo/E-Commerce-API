const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      select: {
        id: true,
        productName: true,
        productPrice: true,
        productStock: true,
      },
    });
    res.json({message: "Request success", products});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAllProducts};
