import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { Role } from "@prisma/client";
import { notFound, redirect } from "next/navigation";

const AdminLogin = async () => {
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
    if (dbUser?.role === Role.ADMIN) redirect("/");
    redirect("/#has-role");
  }
  
  await prisma.admin.create({
    data: {
      id: user.id!,
    },
  });

  await prisma.user.update({
    where: {
      id: user.id!,
    },
    data: {
      role: Role.ADMIN,
    },
  });

  redirect("/");
};

export default AdminLogin;
