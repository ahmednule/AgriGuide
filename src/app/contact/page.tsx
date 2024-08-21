import ContactForm from "@/components/ui/ContactForm";
import SectionHeader from "@/components/ui/SectionHeader";
import React from "react";

const ContactPage = () => {
  return (
    <div className="h-[93vh] pt-24">
      <SectionHeader as="h1" className="m-0">
        Contact Us
      </SectionHeader>
      <ContactForm />
    </div>
  );
};

export default ContactPage;
