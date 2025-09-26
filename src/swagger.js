const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "E-commerce API",
      version: "1.0.0",
      description: "API documentation with Swagger",
    },
    servers: [
      { url: "/api" },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        Role: {
          type: "string",
          enum: ["USER", "ADMIN"],
        },
        OrderStatus: {
          type: "string",
          enum: ["PENDING", "PAID", "SHIPPED", "DELIVERED", "CANCELLED"],
        },
        User: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            userName: { type: "string" },
            userEmail: { type: "string", format: "email" },
            userPassword: { type: "string", description: "Hashed password" },
            userRole: { $ref: "#/components/schemas/Role" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        Product: {
          type: "object",
          properties: {
            id: { type: "integer" },
            productName: { type: "string" },
            productPrice: { type: "integer" },
            productStock: { type: "integer" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        Cart: {
          type: "object",
          properties: {
            id: { type: "integer" },
            userId: { type: "string", format: "uuid" },
            cartItems: {
              type: "array",
              items: { $ref: "#/components/schemas/CartItem" },
            },
          },
        },
        CartItem: {
          type: "object",
          properties: {
            id: { type: "integer" },
            cartItemQuantity: { type: "integer" },
            productId: { type: "integer" },
            cartId: { type: "integer" },
          },
        },
        Order: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            orderDate: { type: "string", format: "date-time" },
            orderAmount: { type: "integer" },
            orderStatus: { $ref: "#/components/schemas/OrderStatus" },
            userId: { type: "string", format: "uuid" },
            orderItems: {
              type: "array",
              items: { $ref: "#/components/schemas/OrderItem" },
            },
            payments: {
              type: "array",
              items: { $ref: "#/components/schemas/Payment" },
            },
          },
        },
        OrderItem: {
          type: "object",
          properties: {
            id: { type: "integer" },
            orderItemQuantity: { type: "integer" },
            productId: { type: "integer" },
            orderId: { type: "string", format: "uuid" },
          },
        },
        Payment: {
          type: "object",
          properties: {
            id: { type: "integer" },
            paymentDate: { type: "string", format: "date-time" },
            orderId: { type: "string", format: "uuid" },
          },
        },
      },
    },
  },
  apis: ["./src/routes/**/*.js"]
};

const specs = swaggerJsdoc(options);
module.exports = specs;
