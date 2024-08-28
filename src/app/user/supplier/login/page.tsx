import { auth } from "@/auth";
import SupplierForm from "@/components/page/admin-page/SupplierForm";
import SectionHeader from "@/components/ui/SectionHeader";
import prisma from "@/lib/prisma";
import { Role, SupplierStatus } from "@prisma/client";
import { notFound, redirect } from "next/navigation";

const SupplierLogin = async () => {
  const session = await auth();
  const user = session?.user;

  if (!user) notFound();

  const dbUser = await prisma.user.findUnique({
    where: {
      id: user.id!,
    },
  });

  const userRole = dbUser?.role;

  const supplier = await prisma.supplier.findUnique({
    where: {
      id: user.id!,
    },
    select: {
      status: true,
    },
  });

  if (userRole && userRole !== Role.SUPPLIER) {
    redirect("/#has-role");
  }

  if (userRole && userRole === Role.SUPPLIER)
    if (supplier?.status === SupplierStatus.APPROVED) {
      redirect("/supplier/dashboard");
    } else if (supplier?.status === SupplierStatus.PENDING) {
      redirect("/#pending");
    } else if (supplier?.status === SupplierStatus.REJECTED) {
      redirect("/#rejected");
    }

  if (!supplier) {
    await prisma.supplier.create({
      data: {
        id: user.id!,
        logo: "",
        name: dbUser?.name || "",
        email: dbUser?.email || "",
        license: "",
        phone: "",
        address: "",
      },
    });

    await prisma.user.update({
      where: {
        id: user.id!,
      },
      data: {
        role: null,
      },
    });
  }

  return (
    <main className="min-h-[93vh] pt-20 pb-10">
      <div className="rounded-xl p-6 max-w-2xl mx-auto bg-gradient-to-t from-emerald-700/20 to-emerald-500/20 border border-emerald-600">
        <SectionHeader as="h1" className="mt-0 mb-10">
          Supplier Registration
        </SectionHeader>
        <SupplierForm user={dbUser!} />
      </div>
    </main>
  );
};

export default SupplierLogin;
