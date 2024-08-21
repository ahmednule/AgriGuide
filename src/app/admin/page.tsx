import { auth } from "@/auth";
import { Role } from "@prisma/client";
import { notFound, redirect } from "next/navigation";

const AdminPage = async () => {
  const session = await auth();
  const user = session?.user;
  if (!user || user.role !== Role.ADMIN) notFound();
  redirect("/admin/dashboard");
};

export default AdminPage;
