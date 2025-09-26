const express = require("express");

const authMiddleware = require("../middleware/auth");
const { register, login } = require("../controllers/authController");
const { getAllProducts} = require("../controllers/productController");
const { getCart, addCartItem, updateCartItem, deleteCartItem} = require ("../controllers/cartController.js");
const { getOrders, getHistoryOrders, createOrder, cancelOrder, updateOrderStatus} = require("../controllers/orderController.js");
const { createPayment } = require("../controllers/paymentController");
const { getAllOrders, getUserOrders, getUserOrderItems, updateUserOrderStatus } = require("../controllers/admin/orderController.js");
const { getUsers } = require("../controllers/admin/userController.js");
const { createProduct, updateProduct, deleteProduct, getProducts } = require("../controllers/admin/productController.js");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("E-Commerce API running with Prisma 🚀");
});

router.post("/register", register);
router.post("/login", login);
router.post("/admin/login", login);

// Admin Route
router.get("/admin/users",  authMiddleware(["ADMIN"]), getUsers);
router.get("/admin/orders", authMiddleware(["ADMIN"]), getAllOrders)
router.get("/admin/users/:userId/orders", authMiddleware(["ADMIN"]), getUserOrders)
router.get("/admin/users/:userId/orders/:orderId", authMiddleware(["ADMIN"]), getUserOrderItems)
router.put("/admin/users/:userId/orders/:orderId/status", authMiddleware(["ADMIN"]), updateUserOrderStatus)

router.get("/admin/products", authMiddleware(["ADMIN"]), getProducts);
router.post("/admin/products", authMiddleware(["ADMIN"]), createProduct);
router.put("/admin/products/:id", authMiddleware(["ADMIN"]), updateProduct);
router.delete("/admin/products/:id", authMiddleware(["ADMIN"]), deleteProduct);

// Products
router.get("/products", getAllProducts);

// Cart
router.get("/cart", authMiddleware(["USER"]), getCart);
router.post("/cart/items", authMiddleware(["USER"]), addCartItem);
router.put("/cart/items/:id", authMiddleware(["USER"]), updateCartItem);
router.delete("/cart/items/:id", authMiddleware(["USER"]), deleteCartItem);

// Order
router.get("/orders", authMiddleware(["USER"]), getOrders);
router.get("/orders/history", authMiddleware(["USER"]), getHistoryOrders);
router.post("/orders", authMiddleware(["USER"]), createOrder);
router.put("/orders/:id/status", authMiddleware(["ADMIN","USER"]), updateOrderStatus);
router.delete("/orders/:id/cancel", authMiddleware(["USER"]), cancelOrder);

// Payment
router.post("/orders/:id/payment", authMiddleware(["USER"]), createPayment);


router.get("/protected", authMiddleware(["ADMIN"]), (req, res) => {
  res.json({ message: "Welcome Admin!", user: req.user });
});

module.exports = router;
