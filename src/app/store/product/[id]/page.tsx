import React from "react";
import prisma from "@/lib/prisma";
import ProductImages from "./ProductImages";
import { Button, Chip } from "@nextui-org/react";

const ProductPage = async ({ params: { id } }: { params: { id: string } }) => {
  const { city, country, images, price, supplier, product } =
    (await prisma.productSupplier.findUnique({
      where: { id },
      select: {
        id: true,
        price: true,
        city: true,
        country: true,
        images: true,
        product: {
          select: { name: true, id: true },
        },
        supplier: {
          select: { name: true },
        },
      },
    })) ?? {};

  const description =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus error placeat tempora debitis, aperiam tempore cum alias, magnam porro rerum praesentium, distinctio ab facere odit nemo doloribus fuga? Quisquam, veniam.  Quia, ipsum sit praesentium facilis cum doloremque amet laudantium maiores velit perferendis incidunt consectetur ad excepturi inventore reprehenderit labore. Enim mollitia laborum necessitatibus quod vero ex sit inventore voluptas nihil.";
  const supplierName = supplier?.name;
  const productName = product?.name;

  return (
    <main className="min-h-[93vh] pt-20 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <aside className="space-y-4 md:sticky md:top-5 self-start">
          {images && images.length > 0 ? (
            <ProductImages images={images} />
          ) : (
            <div className="bg-gray-200 w-full h-[500px] rounded-lg flex items-center justify-center">
              <span>No image available</span>
            </div>
          )}
        </aside>

        <article className="shadow-lg p-8 rounded-xl bg-white/50">
          <header className="mb-2 flex items-center justify-between">
            <Chip className="bg-emerald-600 text-white">{supplierName}</Chip>
            <p className="font-mono uppercase text-sm text-emerald-600 font-bold">
              {city}, {country}
            </p>
          </header>
          <h1 className="text-2xl font-bold mb-4">{productName}</h1>
          <p className="mb-4">${price}</p>
          <p className="mb-4">{description}</p>
          <footer className="mt-8">
            <Button className="bg-emerald-700 text-white">
              Contact supplier
            </Button>
          </footer>
        </article>
    </main>
  );
};

export default ProductPage;
