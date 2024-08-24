import AgrochemicalProducts from "@/components/agrochemicals-page/AgrochemicalProducts";
import SectionHeader from "@/components/ui/SectionHeader";

const AgrochemicalsPage = () => {
  return (
    <main className="min-h-[93vh] pt-20">
      <SectionHeader as="h1" className="mt-0">
        Agrochemical Products
      </SectionHeader>
      <AgrochemicalProducts />
    </main>
  );
};

export default AgrochemicalsPage;
