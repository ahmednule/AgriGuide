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
import { Button, Select, SelectItem } from "@nextui-org/react";
import { deleteScan } from "@/lib/actions";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { ScanType } from "@prisma/client";
import ReactMarkdown from "react-markdown";
import { ExpandedDescriptions, ResourceNames, TScanData } from "@/lib/types";
import { getResourceName } from "@/lib/utils";

type ScanColumnKey = "id" | "description" | "createdAt" | "image" | "actions";

const CustomerScansTable = ({
  scanData,
  resourceNames,
}: {
  scanData: TScanData;
  resourceNames: ResourceNames;
}) => {
  const columns = [
    { key: "index", label: "Index" },
    { key: "createdAt", label: "Created At" },
    { key: "name", label: "Name" },
    { key: "image", label: "Image" },
    { key: "description", label: "Description" },
    { key: "type", label: "Type" },
    { key: "actions", label: "Actions" },
  ];

  const [filterType, setFilterType] = useState<any>(new Set([]));
  const [filterName, setFilterName] = useState<any>(new Set([]));

  const filteredScans = scanData?.scan
    ?.filter(
      (scan) => !filterType.size || scan.type === Array.from(filterType)[0]
    )
    ?.filter(
      (scan) => !filterName.size || scan.name === Array.from(filterName)[0]
    );

  const rows = filteredScans?.map((scan, index) => ({
    id: scan.id,
    createdAt: scan.createdAt.toLocaleDateString(),
    image: scan.url,
    description: scan.description!,
    type: scan.type,
    name: scan.name,
    index: index + 1,
  }));

  const [isLoading, setIsLoading] = useState("");

  const deleteScanFn = async (id: string) => {
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
  const [expandedDescriptions, setExpandedDescriptions] =
    useState<ExpandedDescriptions>({});

  const toggleDescription = (id: string) => {
    setExpandedDescriptions((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const renderCell = React.useCallback(
    (
      scan: {
        id: string;
        image: string;
        name: string;
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
                onPress={() => deleteScanFn(scan.id)}
                title="Delete"
                isLoading={isLoading === scan.id}
                isIconOnly
              >
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </div>
          );
        case "description":
          const isExpanded = expandedDescriptions[scan.id];
          return (
            <div>
              <ReactMarkdown className="whitespace-pre-wrap">
                {isExpanded
                  ? scan.description
                  : scan.description.substring(0, 100) + "..."}
              </ReactMarkdown>
              {scan.description.length > 100 && (
                <button
                  onClick={() => toggleDescription(scan.id)}
                  className="text-blue-500 mt-2 underline"
                >
                  {isExpanded ? "Show less" : "Show more"}
                </button>
              )}
            </div>
          );
        default:
          return cellValue;
      }
    },
    [isLoading, expandedDescriptions]
  );

  return (
    <>
      <div className="space-x-4">
        <Select
          selectedKeys={filterType}
          onSelectionChange={setFilterType}
          label="Filter type"
          color="success"
          variant="bordered"
          className="max-w-40 mb-4"
        >
          <SelectItem key={ScanType.PEST}>Pest</SelectItem>
          <SelectItem key={ScanType.DISEASE}>Disease</SelectItem>
        </Select>
        <Select
          selectedKeys={filterName}
          onSelectionChange={setFilterName}
          label="Filter name"
          color="success"
          variant="bordered"
          className="max-w-40 mb-4"
        >
          {resourceNames.map((resourceName) => (
            <SelectItem key={resourceName.name}>{resourceName.name}</SelectItem>
          ))}
        </Select>
      </div>
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
