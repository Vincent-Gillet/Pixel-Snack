import React from 'react';
import background from '../../assets/image/fonds/plat_background.webp';

function Separator() {

  const backgroundSeparator = {
    background: `url(${background})`,
  };

  return (
    <div className="App-separator container" style={backgroundSeparator}>
    </div>
  );
}

export default Separator;