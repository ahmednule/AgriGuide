import ContactForm from '@/components/page/contact/ContactForm';
import React from 'react'

const ContactPage = () => {
  return (
    <main>
      <header>
        <h1 className="text-3xl text-slate-200 text-center font-bold tracking-wide mb-1">
          Contact Us
        </h1>
        <ContactForm />
        {/* svg image of a crop or sth */}
      </header>
    </main>
  );
}

export default ContactPage