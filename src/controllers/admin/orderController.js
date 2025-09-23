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
          userId,
          NOT: { orderStatus: "CANCELLED" }
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
    const { orderStatus } = req.body;
  
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
  
      const currentStatus = order.orderStatus;
  
      let allowed = false;
  
      if (currentStatus === "PAID" && orderStatus === "SHIPPED") {
        allowed = true;
      }
  
      if (!allowed) {
        return res.status(403).json({
          error: `Transition from ${currentStatus} to ${orderStatus} not allowed for Admin`
        });
      }
  
      const updated = await prisma.order.update({
        where: {
            id: orderId,
            userId: userId
        },
        data: { orderStatus },
      });
  
      res.json(updated);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};  

module.exports = {getAllOrders, getUserOrders, getUserOrderItems, updateUserOrderStatus}