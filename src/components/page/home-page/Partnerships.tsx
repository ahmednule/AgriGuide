import React from 'react'
import Image from 'next/image';
import SectionHeader from '@/components/ui/SectionHeader';

const Partnerships = () => {
  return (
    <section id='partnerships'>
      <SectionHeader>Partnerships</SectionHeader>
      <div className="flex flex-col md:flex-row gap-8 md:gap-0 mx-10 justify-between items-center py-10 rounded-lg">
        <div className="flex flex-col items-center justify-center w-full gap-2 md:gap-5">
          <Image src="/assets/images/nasa.svg" alt="" width={75} height={75} />
          <h3 className="text-lg text-emerald-700">NASA</h3>
        </div>
        <div className="flex flex-col items-center justify-center w-full gap-2 md:gap-5">
          <Image src="/assets/images/meta.svg" alt="" width={75} height={75} />
          <h3 className="text-lg text-emerald-700">Meta</h3>
        </div>
        <div className="flex flex-col items-center justify-center w-full gap-2 md:gap-5">
          <Image
            src="/assets/images/openai.svg"
            alt=""
            width={75}
            height={75}
          />
          <h3 className="text-lg text-emerald-700">OpenAI</h3>
        </div>
        <div className="flex flex-col items-center justify-center w-full gap-2 md:gap-5">
          <Image
            src="/assets/images/microsoft.svg"
            alt=""
            width={75}
            height={75}
          />
          <h3 className="text-lg text-emerald-700">Microsoft</h3>
        </div>
        <div className="flex flex-col items-center justify-center w-full gap-2 md:gap-5">
          <Image
            src="/assets/images/google.svg"
            alt=""
            width={75}
            height={75}
          />
          <h3 className="text-lg text-emerald-500">Google</h3>
        </div>
      </div>
    </section>
  );
}

export default Partnerships