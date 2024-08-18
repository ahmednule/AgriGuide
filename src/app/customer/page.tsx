import { auth } from "@/auth";
import { Role } from "@prisma/client";
import { notFound, redirect } from "next/navigation";

const CustomerPage = async () => {
  const session = await auth();
  const user = session?.user;
  if (!user || user.role !== Role.CUSTOMER) notFound();
  redirect("/customer/scan-history");
};

export default CustomerPage;
