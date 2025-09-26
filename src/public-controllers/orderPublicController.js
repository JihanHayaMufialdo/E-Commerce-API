const getOrders = async (req, res) => {
    res.status(200).json([
      {
        id: "ord001",
        orderDate: "2025-09-24",
        orderAmount: 24000000,
        orderStatus: "PENDING",
        orderItems: [
          { product: { productName: "Apple iPhone 14", productPrice: 12000000 }, orderItemQuantity: 1 },
          { product: { productName: "Samsung Galaxy S23", productPrice: 12000000 }, orderItemQuantity: 1 }
        ]
      }
    ]);
  };
  
  const getHistoryOrders = async (req, res) => {
    res.status(200).json([
      {
        id: "ord002",
        orderDate: "2025-09-20",
        orderAmount: 15000000,
        orderStatus: "DELIVERED",
        orderItems: [
          { product: { productName: "MacBook Air M2", productPrice: 15000000 }, orderItemQuantity: 1 }
        ]
      },
      {
        id: "ord003",
        orderDate: "2025-09-15",
        orderAmount: 3000000,
        orderStatus: "CANCELLED",
        orderItems: [
          { product: { productName: "Sony Headphones", productPrice: 3000000 }, orderItemQuantity: 1 }
        ]
      }
    ]);
  };
  
  const createOrder = async (req, res) => {
    const { orderItems } = req.body;
    res.status(201).json({
      message: "Order created",
      newOrder: {
        id: "ord004",
        orderDate: "2025-09-24",
        orderAmount: 9999999,
        orderStatus: "PENDING",
        orderItems
      }
    });
  };
  
  const updateOrderStatus = async (req, res) => {
    const { id } = req.params;
    res.status(200).json({
      message: "Order status updated",
      receivedOrder: { id, orderStatus: "DELIVERED" }
    });
  };
  
  const cancelOrder = async (req, res) => {
    const { id } = req.params;
    res.status(200).json({
      message: "Order cancelled",
      cancelledOrder: { id, orderStatus: "CANCELLED" }
    });
  };
  
  const getAllOrders = async (req, res) => {
    res.status(200).json({
      message: "Request success",
      formatted: [
        { id: "ord001", orderDate: "2025-09-24", user: { userName: "John Doe", userEmail: "john@example.com" }, orderAmount: 24000000, orderStatus: "PENDING" },
        { id: "ord002", orderDate: "2025-09-20", user: { userName: "Jane Smith", userEmail: "jane@example.com" }, orderAmount: 15000000, orderStatus: "DELIVERED" }
      ]
    });
  };
  
  const getUserOrders = async (req, res) => {
    const { userId } = req.params;
    res.status(200).json({
      message: "Request success",
      formatted: [
        { id: "ord010", orderDate: "2025-09-18", orderAmount: 2000000, orderStatus: "PENDING" },
        { id: "ord011", orderDate: "2025-09-10", orderAmount: 5000000, orderStatus: "DELIVERED" }
      ]
    });
  };
  
  const getUserOrderItems = async (req, res) => {
    const { userId, orderId } = req.params;
    res.status(200).json({
      message: "Request success",
      orderItems: [
        { id: 1, product: { id: 201, productName: "Logitech Mouse", productPrice: 500000 }, orderItemQuantity: 2 },
        { id: 2, product: { id: 202, productName: "Dell Keyboard", productPrice: 1000000 }, orderItemQuantity: 1 }
      ]
    });
  };
  
  const updateUserOrderStatus = async (req, res) => {
    const { userId, orderId } = req.params;
    res.status(200).json({
      message: "Order status updated",
      updated: { id: orderId, userId, orderStatus: "SHIPPED" }
    });
  };
  
  module.exports = {
    getOrders,
    getHistoryOrders,
    createOrder,
    updateOrderStatus,
    cancelOrder,
    getAllOrders,
    getUserOrders,
    getUserOrderItems,
    updateUserOrderStatus,
  };
  