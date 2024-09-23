import React from 'react';
import ContactBloc from '../components/pages/contact/contactbloc';
import Newsletter from '../components/newsletter/newsletter';

function Contact() {
  return (
    <div className="App-Contact container">
        <ContactBloc />
        <Newsletter />
    </div>

  );
}

export default Contact;