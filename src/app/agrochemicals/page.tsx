import AgrochemicalProducts from "@/components/agrochemicals-page/AgrochemicalProducts";
import SectionHeader from "@/components/ui/SectionHeader";
import prisma from "@/lib/prisma";

const AgrochemicalsPage = async () => {
  const productsWithSupplier = await prisma.productSupplier.findMany({
    select: {
      price: true,
      location: true,
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
    }
  });
  return (
    <main className="min-h-[93vh] pt-20">
      <SectionHeader as="h1" className="mt-0">
        Agrochemical Products
      </SectionHeader>
      <AgrochemicalProducts productsWithSupplier={productsWithSupplier} />
    </main>
  );
};

export default AgrochemicalsPage;
