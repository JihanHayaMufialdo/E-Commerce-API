const express = require("express");
const { register, login } = require("../controllers/authController");
const { getUsers } = require("../controllers/userController");
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts
} = require("../controllers/productController");
const {
  getCart,
  addCartItem,
  updateCartItem,
  deleteCartItem,
} = require ("../controllers/cartController.js");
const {
  getOrders,
  getHistoryOrders,
  createOrder,
  updateOrder,
  cancelOrder
} = require("../controllers/orderController.js");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("E-Commerce API running with Prisma 🚀");
});

router.post("/register", register);
router.post("/login", login);

router.get("/users",  authMiddleware(["ADMIN"]), getUsers);

// Products (only ADMIN can create, update, delete)
router.get("/products", getProducts);
router.post("/products", authMiddleware(["ADMIN"]), createProduct);
router.put("/products/:id", authMiddleware(["ADMIN"]), updateProduct);
router.delete("/products/:id", authMiddleware(["ADMIN"]), deleteProduct);

// Cart
router.get("/cart", authMiddleware(["USER"]), getCart);
router.post("/cart/items", authMiddleware(["USER"]), addCartItem);
router.put("/cart/items/:id", authMiddleware(["USER"]), updateCartItem);
router.delete("/cart/items/:id", authMiddleware(["USER"]), deleteCartItem);

// Order
router.get("/orders", authMiddleware(["USER"]), getOrders);
router.get("/orders/history", authMiddleware(["USER"]), getHistoryOrders);
router.post("/orders", authMiddleware(["USER"]), createOrder);
router.put("/orders/:id", authMiddleware(["ADMIN"]), updateOrder);
router.delete("/orders/:id", authMiddleware(["USER"]), cancelOrder);

router.get("/protected", authMiddleware(["ADMIN"]), (req, res) => {
  res.json({ message: "Welcome Admin!", user: req.user });
});

module.exports = router;
