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
  Avatar,
  Button,
  Chip,
  User as NextUser,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { deleteScan } from "@/lib/actions";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow, faTrash } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { ScanType } from "@prisma/client";
import ReactMarkdown from "react-markdown";

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
          type: ScanType;
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
    { key: "type", label: "Type" },
    { key: "actions", label: "Actions" },
  ];

  const [filterType, setFilterType] = useState<any>(new Set([]));

  let filteredScan =
    filterType.size > 0
      ? scanData?.scan?.filter((scan) => scan.type === Array.from(filterType)[0])
      : scanData?.scan;

  const rows = filteredScan?.map((scan, index) => ({
    id: scan.id,
    createdAt: scan.createdAt.toLocaleDateString(),
    image: scan.url,
    description: scan.description!,
    type: scan.type,
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
        type: ScanType;
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
            <ReactMarkdown className="whitespace-pre-wrap">{cellValue}</ReactMarkdown>
          );
        default:
          return cellValue;
      }
    },
    [isLoading]
  );

  return (
    <>
      <Select
        selectedKeys={filterType}
        onSelectionChange={setFilterType}
        label="Filter scan"
        color="success"
        variant="bordered"
        className="max-w-40 mb-4"
      >
        <SelectItem key={ScanType.PEST}>Pest</SelectItem>
        <SelectItem key={ScanType.DISEASE}>Disease</SelectItem>
      </Select>

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
    </>
  );
};

export default CustomerScansTable;
