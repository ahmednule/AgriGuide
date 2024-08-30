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
import {
  Button,
  Chip,
  Link,
  User as NextUser,
  Tooltip,
} from "@nextui-org/react";
import {
  approveSupplier,
  cancelApproval,
  cancelRejection,
  deleteSupplier,
  rejectSupplier,
} from "@/lib/actions";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCancel,
  faEye,
  faThumbsDown,
  faThumbsUp,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Supplier, SupplierStatus } from "@prisma/client";

type SupplierTableColumn =
  | keyof Omit<
      Supplier & {
        _count: {
          ProductSupplier: number;
        };
      },
      "logo"
    >
  | "actions"
  | "supplier";

const SupplierTable = ({
  suppliers,
}: {
  suppliers: (Supplier & { _count: { ProductSupplier: number } })[];
}) => {
  const columns: { key: SupplierTableColumn; label: string }[] = [
    { key: "supplier", label: "Supplier" },
    { key: "createdAt", label: "Created At" },
    { key: "updatedAt", label: "Updated At" },
    {
      key: "address",
      label: "Address",
    },
    {
      key: "phone",
      label: "Phone",
    },
    {
      key: "license",
      label: "License",
    },
    {
      key: "status",
      label: "Status",
    },
    {
      key: "_count",
      label: "No. of Products",
    },
    { key: "actions", label: "Actions" },
  ];

  const rows = suppliers.map((supplier) => ({
    key: supplier.id,
    logo: supplier.logo,
    supplier: supplier.name,
    email: supplier.email,
    createdAt: supplier.createdAt.toLocaleString(),
    updatedAt: supplier.updatedAt.toLocaleString(),
    address: supplier.address,
    phone: supplier.phone,
    _count: supplier._count.ProductSupplier,
    license: supplier.license,
    approvedBy: supplier.approvedBy,
    approvedAt: supplier.approvedAt?.toLocaleString(),
    rejectedBy: supplier.rejectedBy,
    rejectedAt: supplier.rejectedAt?.toLocaleString(),
    status: supplier.status,
  }));

  const [isDeleting, setIsDeleting] = useState("");
  const [isApproving, setIsApproving] = useState("");
  const [isRejecting, setIsRejecting] = useState("");
  const [isCancellingRejection, setIsCancellingRejection] = useState("");
  const [isCancellingApproval, setIsCancellingApproval] = useState("");

  const deleteSupplierFn = async (supplierId: string) => {
    setIsDeleting(supplierId);
    try {
      await deleteSupplier(supplierId);
      toast.success("Supplier deleted successfully");
    } catch (error) {
      toast.error("Failed to delete supplier");
    } finally {
      setIsDeleting("");
    }
  };

  const approveSupplierFn = async (supplierId: string) => {
    setIsApproving(supplierId);
    try {
      await approveSupplier(supplierId);
      toast.success("Supplier approved successfully");
    } catch (error) {
      toast.error("Failed to approve supplier");
    } finally {
      setIsApproving("");
    }
  };

  const rejectSupplierFn = async (supplierId: string) => {
    setIsRejecting(supplierId);
    try {
      await rejectSupplier(supplierId);
      toast.success("Supplier rejected successfully");
    } catch (error) {
      toast.error("Failed to reject supplier");
    } finally {
      setIsRejecting("");
    }
  };

  const cancelRejectionFn = async (supplierId: string) => {
    setIsCancellingRejection(supplierId);
    try {
      await cancelRejection(supplierId);
      toast.success("Rejection cancelled successfully");
    } catch (error) {
      toast.error("Failed to cancel rejection");
    } finally {
      setIsCancellingRejection("");
    }
  };

  const cancelApprovalFn = async (supplierId: string) => {
    setIsCancellingApproval(supplierId);
    try {
      await cancelApproval(supplierId);
      toast.success("Approval cancelled successfully");
    } catch (error) {
      toast.error("Failed to cancel approval");
    } finally {
      setIsCancellingApproval("");
    }
  };

  const renderCell = React.useCallback(
    (supplier: any, columnKey: SupplierTableColumn) => {
      const cellValue = supplier[columnKey];

      switch (columnKey) {
        case "license":
          return (
            <Link className="underline" isExternal title="View license" href={cellValue}>
              <FontAwesomeIcon icon={faEye} />
              <span className="ml-2">License</span>
            </Link>
          );
        case "status":
          let color:
            | "default"
            | "success"
            | "danger"
            | "warning"
            | "primary"
            | "secondary"
            | undefined;
          let statusText;

          if (supplier.status === SupplierStatus.APPROVED) {
            statusText = `Approved by ${
              supplier.approvedBy
            } on ${supplier.approvedAt?.toLocaleString()}`;
            color = "success";
          } else if (supplier.status === SupplierStatus.REJECTED) {
            statusText = `Rejected by ${
              supplier.rejectedBy
            } on ${supplier.rejectedAt?.toLocaleString()}`;
            color = "danger";
          } else {
            statusText = "Pending approval";
            color = "warning";
          }

          return (
            <Tooltip className="text-white" color={color} content={statusText}>
              <Chip color={color} className="text-white">
                {supplier.status}
              </Chip>
            </Tooltip>
          );
        case "supplier":
          return (
            <NextUser
              avatarProps={{ radius: "lg", src: supplier.logo }}
              description={supplier.email}
              name={cellValue}
            >
              {supplier.email}
            </NextUser>
          );
        case "_count":
          return <Link className="underline" href={`/admin/suppliers/${supplier.key}/products`}>{cellValue}</Link>;
        case "actions":
          return (
            <div className="relative flex items-center gap-3 justify-center">
              <Tooltip content="Delete supplier" color="danger">
                <Button
                  color="danger"
                  onPress={() => deleteSupplierFn(supplier.key)}
                  isLoading={isDeleting === supplier.key}
                  isIconOnly
                >
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </Tooltip>
              {supplier.status === SupplierStatus.PENDING ? (
                <>
                  <Tooltip
                    content="Approve supplier"
                    className="text-white"
                    color="success"
                  >
                    <Button
                      onPress={() => approveSupplierFn(supplier.key)}
                      color="success"
                      isLoading={isApproving === supplier.key}
                      isIconOnly
                    >
                      <FontAwesomeIcon
                        icon={faThumbsUp}
                        className="text-white"
                        size="lg"
                      />
                    </Button>
                  </Tooltip>
                  <Tooltip
                    content="Reject supplier"
                    className="text-white"
                    color="warning"
                  >
                    <Button
                      color="warning"
                      isIconOnly
                      isLoading={isRejecting === supplier.key}
                      onPress={() => rejectSupplierFn(supplier.key)}
                    >
                      <FontAwesomeIcon
                        icon={faThumbsDown}
                        className="text-white"
                        size="lg"
                      />
                    </Button>
                  </Tooltip>
                </>
              ) : supplier.status === SupplierStatus.APPROVED ? (
                <>
                  <Tooltip
                    content="Reject supplier"
                    className="text-white"
                    color="warning"
                  >
                    <Button
                      color="warning"
                      isIconOnly
                      isLoading={isRejecting === supplier.key}
                      onPress={() => rejectSupplierFn(supplier.key)}
                    >
                      <FontAwesomeIcon
                        icon={faThumbsDown}
                        className="text-white"
                        size="lg"
                      />
                    </Button>
                  </Tooltip>
                  <Tooltip content="Cancel Approval">
                    <Button
                      isIconOnly
                      isLoading={isCancellingApproval === supplier.key}
                      onPress={() => cancelApprovalFn(supplier.key)}
                    >
                      <FontAwesomeIcon
                        icon={faCancel}
                        className="text-white"
                        size="lg"
                      />
                    </Button>
                  </Tooltip>
                </>
              ) : supplier.status === SupplierStatus.REJECTED ? (
                <>
                  <Tooltip
                    content="Approve supplier"
                    className="text-white"
                    color="success"
                  >
                    <Button
                      onPress={() => approveSupplierFn(supplier.key)}
                      color="success"
                      isLoading={isApproving === supplier.key}
                      isIconOnly
                    >
                      <FontAwesomeIcon
                        icon={faThumbsUp}
                        className="text-white"
                        size="lg"
                      />
                    </Button>
                  </Tooltip>
                  <Tooltip content="Cancel Rejection">
                    <Button
                      isIconOnly
                      isLoading={isCancellingRejection === supplier.key}
                      onPress={() => cancelRejectionFn(supplier.key)}
                    >
                      <FontAwesomeIcon
                        icon={faCancel}
                        className="text-white"
                        size="lg"
                      />
                    </Button>
                  </Tooltip>
                </>
              ) : null}
            </div>
          );
        default:
          return cellValue || "-";
      }
    },
    [
      isApproving,
      isDeleting,
      isRejecting,
      isCancellingRejection,
      isCancellingApproval,
    ]
  );

  return (
    <Table aria-label="Example table with custom cells">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.key}
            align={
              column.key === "actions" || column.key === "_count"
                ? "center"
                : "start"
            }
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
                {renderCell(item, columnKey as SupplierTableColumn)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default SupplierTable;
