import Carousel from "@/components/page/home-page/Carousel";
import Contact from "@/components/page/home-page/Contact";
import FAQ from "@/components/page/home-page/FAQ";
import Features from "@/components/page/home-page/Features";
import HowItWorks from "@/components/page/home-page/HowItWorks";
import Partnerships from "@/components/page/home-page/Partnerships";
import Testimonials from "@/components/page/home-page/Testimonials";
import Chatbot from "@/components/ui/Chatbot";


const Home = () => {
  return (
    <main>
      <Carousel />
      <HowItWorks />
      <Features />
      <Chatbot />
      <Testimonials />
      <Partnerships />
      <FAQ />
      <Contact />
    </main>
  );
};

export default Home;
