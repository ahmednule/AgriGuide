import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { Role } from "@prisma/client";
import { notFound, redirect } from "next/navigation";

const CustomerLogin = async () => {
  const session = await auth();
  const user = session?.user;

  if (!user) notFound();

  const dbUser = await prisma.user.findUnique({
    where: {
      id: user.id!,
    },
  });

  const userHaveRole = dbUser?.role;

  if (userHaveRole) {
    if(dbUser?.role === Role.CUSTOMER) redirect("/");
    redirect("/#has-role")
  };

  await prisma.customer.create({
    data: {
      id: user.id!,
    },
  });

  await prisma.user.update({
    where: {
      id: user.id!,
    },
    data: {
      role: Role.CUSTOMER,
    },
  });

  redirect("/");
  
};

export default CustomerLogin;
