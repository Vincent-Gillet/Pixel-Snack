import React from 'react';
import ContactBloc from '../components/main/contact/contactbloc';
import Newsletter from '../components/newsletter';

function Contact() {
  return (
    <div className="App-Contact container">
        <ContactBloc />
        <Newsletter />
    </div>

  );
}

export default Contact;