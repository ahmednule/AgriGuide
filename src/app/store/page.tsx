import AgrochemicalProducts from "@/components/page/store-page/AgrochemicalProducts";
import LocationDisplay from "@/components/ui/LocationDisplay";
import SectionHeader from "@/components/ui/SectionHeader";
import prisma from "@/lib/prisma";

const StorePage = async () => {
  const productsWithSupplier = await prisma.productSupplier.findMany({
    select: {
      id: true,
      price: true,
      city: true,
      country: true,
      images: true,
      product: {
        select: {
          name: true,
          id: true,
        },
      },
      supplier: {
        select: {
          name: true,
        },
      },
    },
  });
  return (
    <main className="min-h-[93vh] pt-20">
      <SectionHeader as="h1" className="m-0">
        Shop Agrochemicals
      </SectionHeader>
      <LocationDisplay />
      <AgrochemicalProducts productsWithSupplier={productsWithSupplier} />
    </main>
  );
};

export default StorePage;
