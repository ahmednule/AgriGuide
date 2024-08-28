"use client";

import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Button, User as NextUser, Tooltip } from "@nextui-org/react";
import { deleteUser } from "@/lib/actions";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCancel,
  faEye,
  faThumbsDown,
  faThumbsUp,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { CustomerScan } from "@/lib/types";

type CustomerTableColumn = keyof CustomerScan | "actions" | "subscription" | "customer";

const CustomerTable = ({ customer }: { customer: CustomerScan[] }) => {
  const columns: { key: CustomerTableColumn; label: string }[] = [
    { key: "customer", label: "Customer" },
    {
      key: "totalScans",
      label: "Total scans",
    },
    { key: "subscription", label: "Subscription" },
    { key: "createdAt", label: "Created At" },
    { key: "updatedAt", label: "Updated At" },
    { key: "actions", label: "Actions" },
  ];

  const rows = customer.map((customer) => ({
    key: customer.id,
    logo: customer.image,
    customer: customer.name,
    email: customer.userEmail,
    subscription: "Free tier",
    totalScans: customer.totalScans,
    createdAt: customer.createdAt.toLocaleString(),
    updatedAt: customer.updatedAt.toLocaleString(),
  }));

  const [isDeleting, setIsDeleting] = useState("");

  const deleteCustomerFn = async (customerId: string) => {
    setIsDeleting(customerId);
    try {
      await deleteUser(customerId);
      toast.success("Customer deleted successfully");
    } catch (error) {
      toast.error("Failed to delete customer");
    } finally {
      setIsDeleting("");
    }
  };

  const renderCell = React.useCallback(
    (customer: any, columnKey: CustomerTableColumn) => {
      const cellValue = customer[columnKey];

      switch (columnKey) {
        case "customer":
          return (
            <NextUser
              avatarProps={{ radius: "lg", src: customer.logo }}
              description={customer.email}
              name={cellValue}
            >
              {customer.email}
            </NextUser>
          );
        case "actions":
          return (
            <div className="relative flex items-center gap-3 justify-center">
              <Tooltip content="Delete customer" color="danger">
                <Button
                  color="danger"
                  onPress={() => deleteCustomerFn(customer.key)}
                  isLoading={isDeleting === customer.key}
                  isIconOnly
                >
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </Tooltip>
            </div>
          );
        default:
          return cellValue || "-";
      }
    },
    [isDeleting]
  );

  return (
    <Table aria-label="Example table with custom cells">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.key}
            align={column.key === "actions" || column.key === "totalScans" ? "center" : "start"}
          >
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent="No content to display" items={rows}>
        {(item) => (
          <TableRow key={item.key}>
            {(columnKey) => (
              <TableCell>
                {renderCell(item, columnKey as CustomerTableColumn)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default CustomerTable;
