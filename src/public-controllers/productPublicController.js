const getAllProducts = async (req, res) => {
    res.status(200).json({
      message: "Request success",
      products: [
        { id: 1, productName: "Apple iPhone 14", productPrice: 12000000, productStock: 15 },
        { id: 2, productName: "Samsung Galaxy S23", productPrice: 11000000, productStock: 20 },
        { id: 3, productName: "Xiaomi Redmi Note 12", productPrice: 4000000, productStock: 30 }
      ]
    });
  };
  
  const getProducts = async (req, res) => {
    res.status(200).json({
      message: "Request success",
      products: [
        { id: 1, productName: "Apple iPhone 14", productPrice: 12000000, productStock: 15 },
        { id: 2, productName: "Samsung Galaxy S23", productPrice: 11000000, productStock: 20 },
        { id: 3, productName: "Xiaomi Redmi Note 12", productPrice: 4000000, productStock: 30 }
      ]
    });
  };
  
  const createProduct = async (req, res) => {
    const { productName, productPrice, productStock } = req.body;
    res.status(201).json({
      message: "Product created",
      product: {
        id: Math.floor(Math.random() * 1000),
        productName,
        productPrice,
        productStock
      }
    });
  };
  
  const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { productName, productPrice, productStock } = req.body;
    res.status(200).json({
      message: "Product updated",
      product: {
        id: Number(id),
        productName,
        productPrice,
        productStock
      }
    });
  };
  
  const deleteProduct = async (req, res) => {
    const { id } = req.params;
    res.status(200).json({
      message: "Product deleted",
      deletedId: Number(id)
    });
  };
  
  module.exports = { 
    getAllProducts, 
    getProducts, 
    createProduct, 
    updateProduct, 
    deleteProduct 
  };
  