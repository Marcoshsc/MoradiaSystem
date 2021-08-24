const { PrismaClient } = require(".prisma/client");

const prisma = new PrismaClient();

const doThings = async () => {
  const newUser = await prisma.user.create({
    data: {
      name: "Alice",
      email: "alice@prisma.io",
    },
  });

  console.log(newUser);

  const users = await prisma.user.findMany();

  console.log(users);
};

doThings();
