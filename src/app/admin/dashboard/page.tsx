import UserDataChart from "@/components/page/admin-page/Charts";
import MobileNav from "@/components/ui/MobileNav";
import prisma from "@/lib/prisma";
import {
  faArrowRight,
  faUser,
  faUserDoctor,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, CardBody, CardHeader, User } from "@nextui-org/react";
import { Role } from "@prisma/client";
import Link from "next/link";
import React from "react";

const AdminDashboard = async () => {
  const users = await prisma.user.findMany();
  const customers = users.filter((user) => user.role === Role.CUSTOMER);
  const consultants = users.filter((user) => user.role === Role.CONSULTANT);
  const admins = users.filter((user) => user.role === Role.ADMIN);
  return (
    <>
      <MobileNav />
      <section>
        <h1 className="text-3xl font-bold text-emerald-900 mb-8">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card shadow="sm" className="bg-emerald-100 w-full">
            <CardHeader className="text-xl font-bold text-emerald-900">
              <FontAwesomeIcon icon={faUser} className="mr-4 text-2xl" />
              <h2>Customers</h2>
            </CardHeader>
            <CardBody className="text-emerald-800 p-10 ">
              <div className="flex justify-between items-center">
                <p>
                  <span className="font-bold text-xl rounded-full p-3 mr-2 bg-emerald-300">
                    {customers.length}
                  </span>
                  Total Customers
                </p>
                <Button
                  as={Link}
                  href="/admin/customers"
                  className="bg-emerald-700 text-white"
                  isIconOnly
                >
                  <FontAwesomeIcon
                    title="View more"
                    icon={faArrowRight}
                    size="xl"
                  />
                </Button>
              </div>
            </CardBody>
          </Card>
          <Card className="bg-emerald-100 w-full">
            <CardHeader className="text-xl font-bold text-emerald-900">
              <FontAwesomeIcon icon={faUserDoctor} className="mr-4 text-2xl" />
              <h2>Consultants</h2>
            </CardHeader>
            <CardBody className="text-emerald-800 text-center p-10 space-y-10">
              <div className="flex justify-between items-center">
                <p>
                  <span className="font-bold text-xl rounded-full p-3 mr-2 bg-emerald-300">
                    {consultants.length}
                  </span>
                  Total Consultants
                </p>
                <Button
                  as={Link}
                  href="/admin/consultants"
                  className="bg-emerald-700 text-white"
                  isIconOnly
                >
                  <FontAwesomeIcon
                    title="View more"
                    icon={faArrowRight}
                    size="xl"
                  />
                </Button>
              </div>
            </CardBody>
          </Card>
          <Card className="bg-emerald-100 w-full">
            <CardHeader className="text-xl font-bold text-emerald-900">
              <FontAwesomeIcon icon={faUserTie} className="mr-4 text-2xl" />
              <h2>Admins</h2>
            </CardHeader>
            <CardBody className="text-emerald-800 text-center p-10 space-y-10">
              <div className="flex justify-between items-center">
                <p>
                  <span className="font-bold text-xl rounded-full p-3 mr-2 bg-emerald-300">
                    {admins.length}
                  </span>
                  Total Admins
                </p>
                <Button
                  as={Link}
                  href="/admin/admins"
                  className="bg-emerald-700 text-white"
                  isIconOnly
                >
                  <FontAwesomeIcon
                    title="View more"
                    icon={faArrowRight}
                    size="xl"
                  />
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </section>
      <section className="mt-10 space-y-2">
        <h2 className="text-xl font-bold mb-5 text-emerald-900">User Growth</h2>
        <div className="space-y-4">
          <UserDataChart label="Customers Joined" users={customers} />
          <UserDataChart label="Consultants Joined" users={consultants} />
          <UserDataChart label="Admins Joined" users={admins} />
        </div>
      </section>
    </>
  );
};

export default AdminDashboard;
