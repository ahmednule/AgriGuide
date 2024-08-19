"use client";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Button, Link } from "@nextui-org/react";
import { ImagesSlider } from "@/components/ui/ImagesSlider";
import ModalUI from "@/components/ui/ModalUI";
import toast from "react-hot-toast";

const Carousel = () => {
  const images = [
    "https://images.unsplash.com/photo-1485433592409-9018e83a1f0d?q=80&w=1814&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1483982258113-b72862e6cff6?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1482189349482-3defd547e0e9?q=80&w=2848&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  const [hashState, setHashState] = useState("");

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash) setHashState(hash);
    if (hashState === "has-role") {
      toast.error("You are already registered with a different role");
      // Reset the URL by removing the hash
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, [hashState]);

  return (
    <section>
      <ImagesSlider className="h-[100svh]" images={images}>
        <motion.div
          initial={{
            opacity: 0,
            y: -80,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="z-50 flex flex-col justify-center items-center"
        >
          <h1 className="text-2xl -mt-20 md:mt-0 px-10 md:px-0 md:text-4xl max-w-3xl mx-auto text-center font-bold text-white">
            Transform Your Plant Care with Agri
            <span className="text-emerald-500">Guide</span>, an{" "}
            <span className="underline decoration-emerald-500">AI-powered</span>{" "}
            web app.
          </h1>
          <div className="flex gap-4 md:gap-5 mt-12">
            <Button
              as={Link}
              href="#process"
              variant="ghost"
              className="md:px-4 md:py-5 rounded-full md:text-lg bg-transparent hover:!bg-emerald-400/20 border-emerald-400/50 border-large text-white"
            >
              Learn More
            </Button>
            <ModalUI />
          </div>
        </motion.div>
      </ImagesSlider>
    </section>
  );
};

export default Carousel;
