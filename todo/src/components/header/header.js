import React from 'react';

import './header.scss';

const Header = props => {
  return (
    <header>
      <h2>
        There are {props.count || 0} Items To Complete
      </h2>
    </header>
  );
};
export default Header;
