"use client";

import React, { useState } from "react";
import { Button, Card, Image } from "@nextui-org/react";
import { formatDistanceToNow } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import { Product, ProductSupplier } from "@prisma/client";
import { deleteProduct } from "@/lib/actions";

const ProductsList = ({
  products,
}: {
  products: ({
    product: Product;
  } & ProductSupplier)[];
}) => {
  const [isDeletingProduct, setIsDeletingProduct] = useState("");
  const handleDeleteProduct = async ({
    id,
    imagesUrl,
  }: {
    id: string;
    imagesUrl: string[];
  }) => {
    try {
      setIsDeletingProduct(id);
      await deleteProduct({
        id,
        imagesUrl,
      });
      toast.success("Product deleted successfully");
    } catch (e) {
      toast.error(
        `Failed to delete product: ${
          e instanceof Error ? e.message : "Unknown error"
        }`
      );
    } finally {
      setIsDeletingProduct("");
    }
  };

  return (
    <div className="container mx-auto py-8">
      {products.map((product, index) => (
        <Card key={product.id} className="relative mb-8">
          <div className="md:flex">
            <div className="md:w-1/3 p-4">
              <Image
                className="h-full w-full object-cover"
                src={product.images[0]}
                alt={product.product.name}
              />
              <div className="mt-4 grid grid-cols-4 gap-2">
                {product.images.slice(1).map((image, index) => (
                  <Image
                    key={index}
                    className="h-full w-full object-cover "
                    src={image}
                    alt={`${product.product.name} - ${index + 2}`}
                  />
                ))}
              </div>
            </div>
            <div className="md:w-2/3 p-8 flex flex-col md:flex-row justify-between gap-10">
              <div className="flex flex-col justify-between h-full">
                <div>
                  <h2 className="text-xl font-semibold text-emerald-800">
                    {index + 1}. {product.product.name}
                  </h2>
                  <p className="mt-2 text-gray-600">{product.description}</p>
                </div>
                <div className="flex flex-col md:flex-row md:gap-0 mt-5 gap-2 justify-between">
                  <p className="text-gray-500 text-sm">
                    Created:{" "}
                    {formatDistanceToNow(new Date(product.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Last updated:{" "}
                    {formatDistanceToNow(new Date(product.updatedAt), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </div>
              <div className="flex flex-col-reverse gap-3 md:flex-col">
                <p className="text-lg font-bold text-green-600 flex items-center justify-end">
                  ${product.price.toFixed(2)}
                </p>
                <p className="text-sm text-gray-500">
                  {`${product.city}, ${product.region}, ${product.country}`}
                </p>
              </div>
            </div>
          </div>
          <Button
            isIconOnly
            isLoading={isDeletingProduct === product.id}
            color="danger"
            variant="flat"
            className="absolute z-50 bottom-2 left-2 md:right-2 md:left-auto"
            onClick={() =>
              handleDeleteProduct({ id: product.id, imagesUrl: product.images })
            }
          >
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </Card>
      ))}
    </div>
  );
};

export default ProductsList;
