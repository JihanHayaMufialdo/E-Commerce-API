const express = require("express");
const router = express.Router();

const {    
    getAllProducts, 
    getProducts, 
    createProduct, 
    updateProduct, 
    deleteProduct
} = require("../../public-controllers/productPublicController");
const {
    getOrders,
    getHistoryOrders,
    createOrder,
    updateOrderStatus,
    cancelOrder,
    getAllOrders,
    getUserOrders,
    getUserOrderItems,
    updateUserOrderStatus,
} = require("../../public-controllers/orderPublicController");
const {
    getCart,
    addCartItem,
    updateCartItem,
    deleteCartItem,
} = require("../../public-controllers/cartPublicController");
const { createPayment } = require("../../public-controllers/paymentPublicController");
const { register, login } = require("../../public-controllers/authPublicController");

// Auth
router.post("/register", register);
router.post("/login", login);
router.post("/admin/login", login);

// Products
router.get("/products", getAllProducts);
router.get("/admin/products", getProducts);
router.post("/admin/products", createProduct);
router.put("/admin/products/:id", updateProduct);
router.delete("/admin/products/:id", deleteProduct);

// Orders
router.get("/orders", getOrders);
router.get("/orders/history", getHistoryOrders);
router.post("/orders", createOrder);
router.put("/orders/:id/status", updateOrderStatus);
router.delete("/orders/:id/cancel", cancelOrder);
router.get("/admin/orders", getAllOrders)
router.get("/admin/users/:userId/orders", getUserOrders)
router.get("/admin/users/:userId/orders/:orderId", getUserOrderItems)
router.put("/admin/users/:userId/orders/:orderId/status", updateUserOrderStatus)

// Cart
router.get("/cart", getCart);
router.post("/cart", addCartItem);
router.put("/cart/:id", updateCartItem);
router.delete("/cart/:id", deleteCartItem);

// Payments
router.post("/payments/:id", createPayment);

module.exports = router;
