const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  const userPassword = await bcrypt.hash("password123", 10);

  await prisma.user.upsert({
    where: { userEmail: "admin@example.com" },
    update: {},
    create: {
      userName: "Admin",
      userEmail: "admin@example.com",
      userPassword,
      userRole: "ADMIN"
    }
  });

  const user1 = await prisma.user.upsert({
    where: { userEmail: "user@shop.com" },
    update: {},
    create: {
      userName: "Costumer",
      userEmail: "user@shop.com",
      userPassword,
      userRole: "USER"
    }
  });

  const user2 = await prisma.user.upsert({
    where: { userEmail: "user2@shop.com" },
    update: {},
    create: {
      userName: "Costumer",
      userEmail: "user2@shop.com",
      userPassword,
      userRole: "USER"
    }
  });

  await prisma.product.createMany({
    data: [
      {
        productName: "Wireless Mouse",
        productPrice: 150000,
        productStock: 50,
      },
      {
        productName: "Mechanical Keyboard",
        productPrice: 750000,
        productStock: 30,
      },
      {
        productName: "Gaming Headset",
        productPrice: 500000,
        productStock: 20,
      },
      {
        productName: "Laptop Stand",
        productPrice: 200000,
        productStock: 40,
      },
      {
        productName: "USB-C Hub",
        productPrice: 300000,
        productStock: 25,
      },
    ],
    skipDuplicates: true,
  });

  await prisma.cart.createMany({
    data: [
      {
        userId: user1.id,
      },
      {
        userId: user2.id,
      },
    ],
  });

  await prisma.cartItem.createMany({
    data: [
      {
        cartItemQuantity: 2,
        productId: 1,
        cartId: 1
      },
      {
        cartItemQuantity: 1,
        productId: 2,
        cartId: 1
      },
      {
        cartItemQuantity: 3,
        productId: 3,
        cartId: 1
      },
      {
        cartItemQuantity: 5,
        productId: 4,
        cartId: 2
      },
      {
        cartItemQuantity: 2,
        productId: 5,
        cartId: 2
      },
    ],
  });

  await prisma.order.create({
    data: {
      orderDate: new Date(),
      orderAmount: 2000,
      orderStatus: "PENDING",
      userId: user1.id,
      orderItems: {
        create: [
          { productId: 1, orderItemQuantity: 3 },
          { productId: 2, orderItemQuantity: 1 },
          { productId: 3, orderItemQuantity: 1 },
        ],
      },
    },
  });

  await prisma.order.create({
    data: {
      orderDate: new Date(),
      orderAmount: 3000,
      orderStatus: "PENDING",
      userId: user2.id,
      orderItems: {
        create: [
          { productId: 3, orderItemQuantity: 1 },
          { productId: 2, orderItemQuantity: 2 },
          { productId: 5, orderItemQuantity: 1 },
        ],
      },
    },
  });

  console.log("✅ Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
