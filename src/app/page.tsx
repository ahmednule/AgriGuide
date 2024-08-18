import Carousel from "@/components/page/home-page/Carousel";
import FAQ from "@/components/page/home-page/FAQ";
import Features from "@/components/page/home-page/Features";
import Partnerships from "@/components/page/home-page/Partnerships";
import Process from "@/components/page/home-page/Process";
import Testimonials from "@/components/page/home-page/Testimonials";

const Home = () => {
  return (
    <main>
      <Carousel />
      <Process />
      <Features />
      <Testimonials />
      <Partnerships />
      <FAQ />
    </main>
  );
};

export default Home;
