const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllOrders = async (req, res) => {
    try {
  
      const orders = await prisma.order.findMany({
        select: {
            id: true,
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
  
      res.json({message: "Request success", formatted});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

const getUserOrders = async (req, res) => {
    try {
      const { userId } = req.params
  
      const orders = await prisma.order.findMany({
        where: {
          userId
        },
        select: {
            id: true,
            orderDate: true,
            orderAmount: true,
            orderStatus: true,
        },
      });

      const formatted = orders.map(o => ({
        ...o,
        orderDate: o.orderDate.toISOString().split('T')[0]
      }));
  
      res.json({message: "Request success", formatted});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

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
        return res.status(403).json({ error: "Unauthorized: Order does not belong to user" });
      }
  
      const orderItems = await prisma.orderItem.findMany({
        where: { orderId },
        select: {
          id: true,
          product: {
            select: {
              id: true,
              productName: true,
              productPrice: true,
            }
          },
          orderItemQuantity: true
        }
      });
  
      res.json({message: "Request success", orderItems});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };  

const updateUserOrderStatus = async (req, res) => {
    const { userId, orderId } = req.params;
  
    try {
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
        return res.status(400).json({ error: "Order not eligible for shipping (not PAID)" });
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
      res.status(500).json({ error: error.message });
    }
};  

module.exports = {getAllOrders, getUserOrders, getUserOrderItems, updateUserOrderStatus}