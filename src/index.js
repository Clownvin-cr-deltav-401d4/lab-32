import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.js';

import ItemCountProvider from './context/item-count';

class Main extends React.Component {
  render() {
    return (
      <ItemCountProvider>
        <App />
      </ItemCountProvider>
    );
  }
}

const rootElement = document.getElementById('root');
ReactDOM.render(<Main />, rootElement);
