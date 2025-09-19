const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      select: {
        id: true,
        productName: true,
        productPrice: true,
        productStock: true,
        createdAt: true,
        updatedAt: true
      },
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create new product
const createProduct = async (req, res) => {
    try {
      const { productName, productPrice, productStock } = req.body;
  
      const product = await prisma.product.create({
        data: { productName, productPrice, productStock },
      });
  
      res.status(201).json({ message: "Product created", product });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};

// Update product
const updateProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const { productName, productPrice, productStock } = req.body;
  
      const product = await prisma.product.update({
        where: { id: parseInt(id) },
        data: { productName, productPrice, productStock },
      });
  
      res.json({ message: "Product updated", product });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};

// Delete product
const deleteProduct = async (req, res) => {
    try {
      const { id } = req.params;
  
      await prisma.product.delete({
        where: { id: parseInt(id) },
      });
  
      res.json({ message: "Product deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};    

module.exports = { getProducts, createProduct, updateProduct, deleteProduct };
