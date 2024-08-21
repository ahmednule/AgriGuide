import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faUpload } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import SectionHeader from "@/components/ui/SectionHeader";

const Process = () => {
  return (
    <section id="process" className="pb-10">
      <SectionHeader>Process</SectionHeader>
      <div className="flex flex-wrap md:flex-nowrap gap-8 text-white px-10 lg:px-20">
        <div className="text-center w-full rounded-xl shadow-lg shadow-black/20 bg-gradient-to-b from-emerald-800 to-emerald-700 md:basis-1/3 p-10">
          <FontAwesomeIcon className="text-[4rem]" icon={faCamera} />
          <h3 className="text-2xl mt-8 font-semibold">Take a photo</h3>
          <p className="mt-4">
            Take a photo of a crop pest or disease using your device.
          </p>
        </div>
        <div className="text-center w-full rounded-xl shadow-lg shadow-black/20 bg-gradient-to-b from-emerald-800 to-emerald-700 md:basis-1/3 p-10">
          <FontAwesomeIcon className="text-[4rem]" icon={faUpload} />
          <h3 className="text-2xl mt-8 font-semibold">Upload it</h3>
          <p className="mt-4">
            Upload the photo from your camera or from your device storage to our
            AI-powered app.
          </p>
        </div>
        <div className="items-center w-full justify-center text-center rounded-xl shadow-lg shadow-black/20 bg-gradient-to-b from-emerald-800 to-emerald-700 md:basis-1/3 p-10">
          <div className="flex items-center justify-center">
            <Image
              src="/assets/images/scan.svg"
              width={64}
              height={64}
              alt=""
            />
          </div>
          <h3 className="text-2xl mt-8 font-semibold">Get a diagnosis</h3>
          <p className="mt-4">
            Get a diagnosis in seconds, along with tailored treatment and expert
            support.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Process;
