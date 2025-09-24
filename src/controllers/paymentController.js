const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const midtransClient = require('midtrans-client');

const snap = new midtransClient.Snap({
  isProduction: false, 
  serverKey: process.env.MIDTRANS_SERVER_KEY
});

const createPayment = async (req, res) => {

  try {
    const { id } = req.params;

    const order = await prisma.order.findUnique({
        where: { id },
        include: {
            user: true
          }
    });

    if (!order) return res.status(404).json({ error: "Order not found" });

    if (order.orderStatus !== "PENDING") {
      return res.status(400).json({ error: "Order must be pending" });
    }

    const parameter = {
      "transaction_details": {
        "order_id": order.id,
        "gross_amount": order.orderAmount
      },
      "customer_details": {
        "first_name": order.user.userName,
        "email": order.user.userEmail
      }
    };

    const transaction = await snap.createTransaction(parameter);

    const payment = await prisma.payment.create({
      data: {
        paymentDate: new Date(),
        orderId: order.id
      }
    });

    res.json({
      message: "Payment token created",
      // payment,
      redirect_url: transaction.redirect_url,
      token: transaction.token
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const handleNotification = async (req, res) => {
  const notification = req.body;

  try {
    const orderId = notification.order_id.split("-")[1];
    const transactionStatus = notification.transaction_status;

    let newStatus = "PENDING";

    if (transactionStatus === "settlement" || transactionStatus === "capture") {
      newStatus = "PAID";
    } else if (
      transactionStatus === "deny" ||
      transactionStatus === "cancel" ||
      transactionStatus === "expire"
    ) {
      newStatus = "CANCELLED";
    }

    await prisma.order.update({
      where: { id: Number(orderId) },
      data: { orderStatus: newStatus }
    });

    res.json({ message: "Notification processed", status: newStatus });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createPayment, handleNotification };

