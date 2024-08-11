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
import { Avatar, Button, Chip, User as NextUser } from "@nextui-org/react";
import { deleteScan } from "@/lib/actions";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow, faTrash } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { convertMarkdownToHtml } from "@/lib/utils";

type ScanColumnKey = "id" | "description" | "createdAt" | "image" | "actions";

const CustomerScansTable = ({
  scanData,
}: {
  scanData:
    | ({
        scan: {
          id: string;
          description: string | null;
          url: string;
          createdAt: Date;
          customerId: string;
        }[];
      } & {
        id: string;
      })
    | null;
}) => {
  const columns = [
    { key: "index", label: "Index" },
    { key: "createdAt", label: "Created At" },
    { key: "image", label: "Image" },
    { key: "description", label: "Description" },
    { key: "actions", label: "Actions" },
  ];

  const rows = scanData?.scan?.map((scan, index) => ({
    id: scan.id,
    createdAt: scan.createdAt.toLocaleDateString(),
    image: scan.url,
    description: scan.description!,
    index: index + 1,
  }));

  const [isLoading, setIsLoading] = useState("");

  const deletePreviousScan = async (id: string) => {
    setIsLoading(id);
    try {
      await deleteScan(id);
      toast.success("Scan deleted successfully");
    } catch (error) {
      toast.error("Failed to delete scan");
    } finally {
      setIsLoading("");
    }
  };

  const renderCell = React.useCallback(
    (
      scan: {
        id: string;
        image: string;
        description: string;
        createdAt: string;
      },
      columnKey: ScanColumnKey
    ) => {
      const cellValue = scan[columnKey as keyof typeof scan];

      switch (columnKey) {
        case "image":
          return (
            <div className="w-72 h-48">
              <Image
                src={cellValue || ""}
                alt={scan.description}
                fill
                className="object-cover rounded-md"
              />
            </div>
          );
        case "actions":
          return (
            <div className="relative flex items-center gap-3 justify-center">
              <Button
                color="danger"
                onPress={() => deletePreviousScan(scan.id)}
                title="Delete"
                isLoading={isLoading === scan.id}
                isIconOnly
              >
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </div>
          );
        case "description":
          return (
            <div
              className="whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: convertMarkdownToHtml(cellValue) }}
            />
          );
        default:
          return cellValue;
      }
    },
    [isLoading]
  );

  return (
    <Table isStriped aria-label="Example table with custom cells">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.key}
            align={column.key === "actions" ? "center" : "start"}
          >
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent="No content to display" items={rows}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>
                {renderCell(item, columnKey as ScanColumnKey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default CustomerScansTable;
