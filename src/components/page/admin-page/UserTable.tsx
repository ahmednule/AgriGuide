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
import { User } from "@prisma/client";
import { Button, User as NextUser, Tooltip } from "@nextui-org/react";
import { deleteUser } from "@/lib/actions";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow, faTrash } from "@fortawesome/free-solid-svg-icons";

type UserColumnKey = keyof {
  id: string;
  image: string | null;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
} &
  "images" &
  "User";

const UserTable = ({ users }: { users: User[] }) => {
  // // Define columns explicitly based on the User model
  const columns = [
    { key: "user", label: "User" },
    { key: "createdAt", label: "Created At" },
    { key: "updatedAt", label: "Updated At" },
    { key: "actions", label: "Actions" },
  ];

  // Prepare rows from users
  const rows = users.map((user) => ({
    key: user.id,
    image: user.image,
    user: user.name || "-",
    name: user.name || "-",
    email: user.email || "-",
    createdAt: user.createdAt.toLocaleDateString(),
    updatedAt: user.updatedAt.toLocaleDateString(),
  }));

  const [isLoading, setIsLoading] = useState("");

  const deleteUserFn = async (userId: string) => {
    setIsLoading(userId);
    try {
      await deleteUser(userId);
      toast.success("User deleted successfully");
    } catch (error) {
      toast.error("Failed to delete user");
    } finally {
      setIsLoading("");
    }
  };

  const renderCell = React.useCallback(
    (
      user: {
        key: string;
        image: string | null;
        name: string;
        email: string;
        createdAt: string;
        updatedAt: string;
      },
      columnKey: UserColumnKey
    ) => {
      const cellValue = user[columnKey];

      switch (columnKey) {
        case "user":
          return (
            <NextUser
              avatarProps={{ radius: "lg", src: user.image || "" }}
              description={user.email}
              name={cellValue as string}
            >
              {user.email}
            </NextUser>
          );
        case "actions":
          return (
            <div className="relative flex items-center gap-3 justify-center">
              <Tooltip color="danger" content="Delete">
                <Button
                  color="danger"
                  title="Delete"
                  onPress={() => deleteUserFn(user.key)}
                  isLoading={isLoading === user.key}
                  isIconOnly
                >
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </Tooltip>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [isLoading]
  );

  return (
    <Table aria-label="Example table with custom cells">
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
          <TableRow key={item.key}>
            {(columnKey) => (
              <TableCell>
                {renderCell(item, columnKey as UserColumnKey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default UserTable;
