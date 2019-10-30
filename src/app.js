import React from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';

// State Only
import ToDo from './components/todo/todo-local.js';

// API Connected (Live Data)
import ToDoConnected from './components/todo/todo-connected.js';

import ItemCountProvider from './context/item-count';
import DisplayCompletedProvider from './context/display-completed';

export default class App extends React.Component {
  render() {
    return (
      <ItemCountProvider>
        <DisplayCompletedProvider>
          <BrowserRouter>
            <nav>
              <ul>
                <li><Link to="/">Local ToDo</Link></li>
                <li><Link to="/connected">Connected ToDo</Link></li>
              </ul>
            </nav>
            <Switch>
              <Route path="/connected" component={ToDoConnected} />
              <Route component={ToDo} />
            </Switch>
          </BrowserRouter>
        </DisplayCompletedProvider>
      </ItemCountProvider>
    );
  }
}
