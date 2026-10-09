
import { prisma } from "./lib/prisma.js";

async function main() {
  const user = await prisma.user.upsert({
    where: { id: 1 },
    update: {},
    create: { name: "Test User" },
  });

  const post1 = await prisma.post.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: "First Test Post",
      body: "Testing the Prisma vote endpoint.",
    },
  });

  const post2 = await prisma.post.upsert({
    where: { id: 2 },
    update: {},
    create: {
      title: "Second Test Post",
      body: "Another post for testing.",
    },
  });

  console.log("Test user:", user);
  console.log("Test posts:", post1, post2);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
