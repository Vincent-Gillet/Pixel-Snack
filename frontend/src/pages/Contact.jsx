import React from 'react';
import ContactBloc from '../components/pages/contact/contactbloc';
import Newsletter from '../components/newsletter/newsletter';
import Banner from '../components/banner/banner';
import customImage from '../assets/image/recettes/ramen-poulet.jpg';

function Contact() {
  return (
    <div className="App-Contact container">
        <Banner title="Contact" image={customImage} altText="ramen" />
        <ContactBloc />
        <Newsletter />
    </div>

  );
}

export default Contact;