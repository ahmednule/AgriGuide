import MobileNav from "@/components/ui/MobileNav";
import { Button, Link } from "@nextui-org/react";

const AdminPage = () => {
  return (
    <>
      <MobileNav />
      <h1 className="text-3xl text-emerald-800 font-bold">Admin Panel</h1>
      <p className="text-emerald-800 mt-5">
        This interface provides streamlined access to essential administrative
        functions, including the dashboard, customer management, consultant
        oversight, and fellow admin coordination. Utilize the tools below to
        efficiently manage and oversee operations.
      </p>
      <div className="gap-3 mt-5 flex flex-wrap">
        <Button
          as={Link}
          href="/admin/dashboard"
          className="!bg-emerald-600 text-white"
        >
          Dashboard
        </Button>
        <Button
          as={Link}
          href="/admin/customers"
          className="!bg-emerald-600 text-white"
        >
          Customers
        </Button>
        <Button
          as={Link}
          href="/admin/consultants"
          className="!bg-emerald-600 text-white"
        >
          Consultants
        </Button>
        <Button
          as={Link}
          href="/admin/admins"
          className="!bg-emerald-600 text-white"
        >
          Admin
        </Button>
      </div>
    </>
  );
};

export default AdminPage;
