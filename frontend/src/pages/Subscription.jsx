import React from 'react';
import SubscriptionBloc from '../components/subscription';
import Newsletter from '../components/newsletter';

function Subscription() {
  return (
    <div className="App container">
        <SubscriptionBloc />
        <Newsletter />
    </div>

  );
}

export default Subscription;