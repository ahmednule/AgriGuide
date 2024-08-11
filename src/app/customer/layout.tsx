import { auth } from "@/auth";
import CustomerAside from "@/components/page/customer-page/CustomerAside";
import { Role } from "@prisma/client";
import { redirect } from "next/navigation";
import React, { PropsWithChildren } from "react";

const layout = async ({ children }: PropsWithChildren) => {
  const session = await auth();
  if (session?.user.role !== Role.CUSTOMER) redirect("/");
  return (
    <div className="h-[93vh] flex bg-emerald-50">
      <CustomerAside />
      <main className="p-10 pt-20 lg:p-20 lg:w-5/6 h-full overflow-y-auto text-emerald-900">
        {children}
      </main>
    </div>
  );
};

export default layout;
