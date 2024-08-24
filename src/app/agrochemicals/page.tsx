import AgrochemicalsList from "@/components/agrochemicals-page/AgrochemicalsList";
import SectionHeader from "@/components/ui/SectionHeader";


const AgrochemicalsPage = () => {
  return (
    <main className="min-h-[93vh] pt-20">
      <SectionHeader as="h1" className="mt-0">
        Agrochemical Products
      </SectionHeader>
     <AgrochemicalsList />
    </main>
  );
};

export default AgrochemicalsPage;
