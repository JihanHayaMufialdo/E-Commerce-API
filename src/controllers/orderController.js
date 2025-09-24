const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();

// GET all active orders
const getOrders = async (req, res) => {
    try {
      const userId = req.user.id;
  
      const orders = await prisma.order.findMany({
        where: {
          userId,
          NOT: [ 
            { orderStatus: "CANCELLED"},
            { orderStatus: "DELIVERED"} 
          ]
        },
        select: {
          orderDate: true,
          orderAmount: true,
          orderStatus: true,
          orderItems: {
            select: {
                product: {
                  select: {
                    productName: true,
                    productPrice: true,
                  }
                },
                orderItemQuantity: true
            }
          },
        }
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

// Get cancelled orders (history)
const getHistoryOrders = async (req, res) => {
    try {
      const userId = req.user.id;
  
      const cancelledOrders = await prisma.order.findMany({
        where: {
          userId,
          OR: [
            { orderStatus: "CANCELLED" },
            { orderStatus: "DELIVERED" },
          ]
        },
        select: {
          orderDate: true,
          orderAmount: true,
          orderStatus: true,
          orderItems: {
            select: {
                product: {
                  select: {
                    productName: true,
                    productPrice: true,
                  }
                },
                orderItemQuantity: true
            }
          },
        }
      });
  
      const formatted = cancelledOrders.map(o => ({
        ...o,
        orderDate: o.orderDate.toISOString().split('T')[0]
      }));
  
      res.json(formatted);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

// Create order (update product stock)
const createOrder = async (req, res) => {
  const userId = req.user.id;
  const { orderItems } = req.body;

  try {
    let orderAmount = 0;

    // Check stock & calculate total price
    for (const item of orderItems) {
      const product = await prisma.product.findFirst({
        where: { id: item.productId }
      });

      if (!product) {
        return res.status(404).json({ error: `Product ${item.productId} not found` });
      }
      if (product.productStock < item.orderItemQuantity) {
        return res.status(400).json({ error: `Not enough stock for ${product.productName}` });
      }

      orderAmount += product.productPrice * item.orderItemQuantity;
    }

    // Create order & update stock in a transaction
    const newOrder = await prisma.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: {
          userId,
          orderDate: new Date(),
          orderAmount,
          orderItems: {
            create: orderItems.map((item) => ({
              productId: item.productId,
              orderItemQuantity: item.orderItemQuantity,
            })),
          },
        },
        include: {
          orderItems: { include: { product: true } }
        }
      });

      // Update product stock
      for (const item of orderItems) {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            productStock: { decrement: item.orderItemQuantity }
          }
        });
      }

      return order;
    });

    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update order status
const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const order = await prisma.order.findFirst({
      where: { userId, id: Number(id) },
    });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    if (order.orderStatus !== "SHIPPED") {
      return res.status(400).json({ error: "Order can only marked as delivered if status is still shipped" });
    }

    const receivedOrder = await prisma.order.update({
      where: { id: Number(id) },
      data: { orderStatus: "DELIVERED" }
    });

    res.json({
      message: "Order status updated",
      receivedOrder
    });

  } catch (error) {
    if (error instanceof Prisma.PrismaClientValidationError) {
      return res.status(400).json({
        error: "Invalid value for orderStatus, Order cannot be cancelled"
      });
    }
    res.status(500).json({ error: error.message });
  }
};


// Cancel Order
const cancelOrder = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
  
    try {
      const order = await prisma.order.findFirst({
        where: { userId, id: Number(id) },
        include: { orderItems: true }
      });
  
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
      if (order.orderStatus !== "PENDING") {
        return res.status(400).json({ error: "Order can only be cancelled if status is still pending" });
      }

      const cancelledOrder = await prisma.order.update({
        where: { id: Number(id) },
        data: { orderStatus: "CANCELLED" }
      });
  
      res.json({
        message: "Order cancelled",
        cancelledOrder
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

module.exports = { getOrders, getHistoryOrders, createOrder, updateOrderStatus, cancelOrder };

