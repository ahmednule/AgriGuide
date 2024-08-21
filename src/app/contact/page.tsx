import ContactForm from '@/components/ui/ContactForm';
import SectionHeader from '@/components/ui/SectionHeader';
import React from 'react'

const ContactPage = () => {
  return (
    <section className="h-[93vh] pt-24">
      <SectionHeader className='my-0'>Contact Us</SectionHeader>
      <ContactForm />
    </section>
  );
}

export default ContactPage