const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  const userPassword = await bcrypt.hash("password123", 10);

  await prisma.user.create({
    data: {
        userName: "Admin User",
        userEmail: "admin@shop.com",
        userPassword,
        userRole: "ADMIN",
    },
  });

  await prisma.user.create({
    data: {
        userName: "Costumer",
        userEmail: "user@shop.com",
        userPassword,
        userRole: "USER",
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
