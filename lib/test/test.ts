import prisma from "../prisma";

export async function submitUser() {
  const user = {
    firstName: "Calin",
    lastName: "Balls",
    username: "mr-balls2",
  };

  const res = await prisma.user.create({
    data: {
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      role: "ADMIN",
    },
    select: {
      firstName: true,
      lastName: true,
      username: true,
      id: true,
    },
  });

  return res;
}

async function submitInvite() {}
