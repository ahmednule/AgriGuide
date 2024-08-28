import { auth } from "@/auth";
import UserDataChart from "@/components/page/admin-page/Charts";
import MobileNav from "@/components/ui/MobileNav";
import { GEOLOCATION_API } from "@/lib/constants";
import prisma from "@/lib/prisma";
import { IpInfo } from "@/lib/types";
import {
  faArrowRight,
  faBoxes,
  faBoxesStacked,
  faCoins,
  faReceipt,
  faUser,
  faUserDoctor,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, CardBody, CardHeader, User } from "@nextui-org/react";
import { Role } from "@prisma/client";
import Link from "next/link";
import React from "react";

const SupplierDashboard = async () => {
  const users = await prisma.user.findMany();
  const customers = users.filter((user) => user.role === Role.CUSTOMER);
  const consultants = users.filter((user) => user.role === Role.CONSULTANT);
  const admins = users.filter((user) => user.role === Role.ADMIN);
  const suppliers = users.filter((user) => user.role === Role.SUPPLIER);

  const session = await auth();
  const user = session?.user;

  const res = await fetch(
    `https://api.ipgeolocation.io/ipgeo?apiKey=${GEOLOCATION_API}`
  );

  const {
    currency: { symbol },
  }: IpInfo = await res.json();

  const products = await prisma.productSupplier.findMany({
    where: { supplierId: user?.id },
  });

  const productNameWithCount = await prisma.productSupplier.groupBy({
    by: ["productId"],
    _count: {
      _all: true,
    },
    where: {
      supplierId: user?.id,
    },
    orderBy: {
      _count: {
        productId: "desc",
      },
    },
  });

  // Fetch product names separately
  const productNames = await prisma.product.findMany({
    where: {
      id: {
        in: productNameWithCount.map((p) => p.productId),
      },
    },
    select: {
      id: true,
      name: true,
    },
  });

  // Combine product names with counts
  const productsWithNameAndCount = productNameWithCount.map((product) => ({
    ...product,
    name:
      productNames.find((p) => p.id === product.productId)?.name ||
      "Unknown Product",
  }));

  return (
    <>
      <MobileNav />
      <section>
        <h1 className="text-3xl font-bold text-emerald-900 mb-8">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card shadow="sm" className="bg-emerald-100 w-full">
            <CardHeader className="text-xl font-bold flex justify-between items-center text-emerald-900">
              <div className="flex gap-4">
                <FontAwesomeIcon icon={faBoxes} className="text-2xl" />
                <h2>Products</h2>
              </div>
              <span className="font-bold text-xl rounded-full p-3 mr-2 bg-emerald-300">
                {products.length}
              </span>
            </CardHeader>
            <CardBody className="text-emerald-800 p-10 ">
              <div className="flex flex-col">
                <div className="flex justify-between flex-wrap gap-10">
                  {productsWithNameAndCount.map((product) => (
                    <p key={product.productId}>
                      <span className="font-bold text-xl rounded-full p-3 mr-2 bg-emerald-300">
                        {product._count._all}
                      </span>
                      {product.name}
                    </p>
                  ))}
                </div>
                <Button
                  as={Link}
                  href="/admin/consultants"
                  className="bg-emerald-700 self-end mt-5 text-white"
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
              <FontAwesomeIcon icon={faCoins} className="mr-4 text-2xl" />
              <h2>Sales</h2>
            </CardHeader>
            <CardBody className="text-emerald-800 text-center p-10 space-y-10">
              <div className="flex justify-between items-center">
                <p>
                  <span className="font-bold text-xl rounded-full p-3 mr-2 bg-emerald-300">
                    {symbol} 325,000
                  </span>
                  Total Sales
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
              <FontAwesomeIcon icon={faReceipt} className="mr-4 text-2xl" />
              <h2>Orders</h2>
            </CardHeader>
            <CardBody className="text-emerald-800 text-center p-10 space-y-10">
              <div className="flex flex-col">
                <div className="flex justify-between flex-wrap gap-10">
                  <p>
                    <span className="font-bold text-xl rounded-full p-3 mr-2 bg-emerald-300">
                      125
                    </span>
                    Total Orders
                  </p>
                  <p>
                    <span className="font-bold text-xl rounded-full p-3 mr-2 bg-emerald-300">
                      80
                    </span>
                    Completed Orders
                  </p>
                  <p>
                    <span className="font-bold text-xl rounded-full p-3 mr-2 bg-emerald-300">
                      20
                    </span>
                    Pending Orders
                  </p>
                  <p>
                    <span className="font-bold text-xl rounded-full p-3 mr-2 bg-emerald-300">
                      15
                    </span>
                    Cancelled Orders
                  </p>
                  <p>
                    <span className="font-bold text-xl rounded-full p-3 mr-2 bg-emerald-300">
                      10
                    </span>
                    Refunded Orders
                  </p>
                </div>
                <Button
                  as={Link}
                  href="/admin/consultants"
                  className="bg-emerald-700 self-end mt-5 text-white"
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
          <UserDataChart label="Products Added" users={customers} />
          <UserDataChart label="Sales Made" users={consultants} />
          <UserDataChart label="Orders Made" users={[]} />
          <UserDataChart label="Completed Orders" users={[]} />
          <UserDataChart label="Pending Orders" users={[]} />
          <UserDataChart label="Cancelled Orders" users={[]} />
          <UserDataChart label="Refunded Orders" users={[]} />
        </div>
      </section>
    </>
  );
};

export default SupplierDashboard;
