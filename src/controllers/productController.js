const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      select: {
        productName: true,
        productPrice: true,
        productStock: true,
      },
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAllProducts};
