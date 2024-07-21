import React from 'react'
import SectionHeader from '../ui/SectionHeader'
import ContactForm from '../page/contact/ContactForm';

const Contact = () => {
  return (
    <section id='contact'>
      <SectionHeader>Contact Us</SectionHeader>
      <ContactForm />
    </section>
  );
}

export default Contact