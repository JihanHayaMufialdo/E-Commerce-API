const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();

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
          id: true,
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
          id: true,
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

const createOrder = async (req, res) => {
  const userId = req.user.id;
  const { orderItems } = req.body;

  try {
    let orderAmount = 0;

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

    res.status(201).json({message: "Order created", newOrder});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const order = await prisma.order.findFirst({
      where: { userId, id: String(id) },
    });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    if (order.orderStatus !== "SHIPPED") {
      return res.status(400).json({ error: "Order can only marked as delivered if status is still shipped" });
    }

    const receivedOrder = await prisma.order.update({
      where: { id: String(id) },
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

const cancelOrder = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
  
    try {
      const order = await prisma.order.findFirst({
        where: { userId, id: String(id) },
        include: { orderItems: true }
      });
  
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
      if (order.orderStatus !== "PENDING") {
        return res.status(400).json({ error: "Invalid value for orderStatus, Order cannot be cancelled" });
      }

      const cancelledOrder = await prisma.order.update({
        where: { id: String(id) },
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

