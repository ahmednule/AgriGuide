import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { Role } from "@prisma/client";
import { redirect } from "next/navigation";

const ConsultantLogin = async () => {
  const session = await auth();
  const user = session?.user;

  if (!user) redirect("/");

  const dbUser = await prisma.user.findUnique({
    where: {
      id: user.id!,
    },
  });

  const userHaveRole = dbUser?.role;

  if (userHaveRole) redirect("/");

  await prisma.consultant.create({
    data: {
      id: user.id!,
    },
  });

  await prisma.user.update({
    where: {
      id: user.id!,
    },
    data: {
      role: Role.CONSULTANT,
    },
  });

  redirect("/");
};

export default ConsultantLogin;
