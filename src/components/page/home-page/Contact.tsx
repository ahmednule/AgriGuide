import ContactForm from '@/components/ui/ContactForm';
import SectionHeader from '@/components/ui/SectionHeader';
import React from 'react'

const Contact = () => {
  return (
    <section id='contact' className='mb-10'>
      <SectionHeader>Contact Us</SectionHeader>
      <ContactForm />
    </section>
  );
}

export default Contact