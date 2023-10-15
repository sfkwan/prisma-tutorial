import { PrismaClient } from "@prisma/client";
import { error, log } from "console";

const prisma = new PrismaClient();

const main = async () => {
  const alice = await prisma.user.upsert({
    where: {
      email: "alice@prisma.co",
    },
    update: {},
    create: {
      name: "Alice",
      email: "alice@prisma.co",
    },
  });

  const bob = await prisma.user.upsert({
    where: {
      email: "bob@prisma.co",
    },
    update: {},
    create: {
      name: "Bob",
      email: "bob@prisma.co",
      posts: {
        create: {
          title: "Hello world",
          
        },
      },
    },
  });

  const users = await prisma.user.findMany({
    include: {
      posts: true,
    },
  });
  // console.log({ alice, bob });

  console.dir(users, { depth: null });
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
