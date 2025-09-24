const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();

// GET all orders
const getAllOrders = async (req, res) => {
    try {
  
      const orders = await prisma.order.findMany({
        select: {
            orderDate: true,
            user: {
                select: {
                    userName: true,
                    userEmail: true
                }
            },
            orderAmount: true,
            orderStatus: true,
        },
      });

      const formatted = orders.map(o => ({
        ...o,
        orderDate: o.orderDate.toISOString().split('T')[0]
      }));
  
      res.json(formatted);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

// Get user order
const getUserOrders = async (req, res) => {
    try {
      const { userId } = req.params
  
      const orders = await prisma.order.findMany({
        where: {
          userId
        },
        select: {
            orderDate: true,
            orderAmount: true,
            orderStatus: true,
        },
      });

      const formatted = orders.map(o => ({
        ...o,
        orderDate: o.orderDate.toISOString().split('T')[0]
      }));
  
      res.json(formatted);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

// Get user order items
const getUserOrderItems = async (req, res) => {
    try {
      const { userId, orderId } = req.params;
  
      const order = await prisma.order.findFirst({
        where: {
          id: orderId,
          userId: userId
        },
        select: { id: true }
      });
  
      if (!order) {
        return res.status(403).json({ error: "Unauthorized: Order does not belong to this user" });
      }
  
      const orderItems = await prisma.orderItem.findMany({
        where: { orderId },
        select: {
          product: {
            select: {
              productName: true,
              productPrice: true,
            }
          },
          orderItemQuantity: true
        }
      });
  
      res.json(orderItems);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };  

// Update order status
const updateUserOrderStatus = async (req, res) => {
    const { userId, orderId } = req.params;
  
    try {
      // Check if order belongs to the user
      const order = await prisma.order.findFirst({
        where: {
          id: orderId,
          userId: userId
        }
      });
  
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
  
      if (order.orderStatus !== "PAID") {
        return res.status(400).json({ error: "Order can only SHIPPED if order status is PAID" });
      }
  
      const updated = await prisma.order.update({
        where: {
            id: orderId,
            userId: userId
        },
        data: { orderStatus: "SHIPPED" },
      });
  
      res.json({message: "Order status updated", updated});
    } catch (error) {
      if (error instanceof Prisma.PrismaClientValidationError) {
        return res.status(400).json({
          error: "Invalid value for orderStatus, Order cannot be cancelled"
        });
      }
      res.status(500).json({ error: error.message });
    }
};  

module.exports = {getAllOrders, getUserOrders, getUserOrderItems, updateUserOrderStatus}