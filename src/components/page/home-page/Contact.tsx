import ContactForm from '@/components/ui/ContactForm';
import SectionHeader from '@/components/ui/SectionHeader';
import React from 'react'

const Contact = () => {
  return (
    <section id='contact'>
      <SectionHeader>Contact Us</SectionHeader>
      <ContactForm />
    </section>
  );
}

export default Contact