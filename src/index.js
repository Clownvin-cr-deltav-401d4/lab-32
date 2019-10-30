import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.js';

import ItemCountProvider from './context/item-count';
import DisplayCompletedProvider from './context/display-completed';

class Main extends React.Component {
  render() {
    return (
      <ItemCountProvider>
        <DisplayCompletedProvider>
          <App />
        </DisplayCompletedProvider>
      </ItemCountProvider>
    );
  }
}

const rootElement = document.getElementById('root');
ReactDOM.render(<Main />, rootElement);
