import React from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';

// State Only
import ToDo from './components/todo/todo-local.js';

// API Connected (Live Data)
import ToDoConnected from './components/todo/todo-connected.js';

import ItemCountProvider from './context/item-count';
import DisplayCompletedProvider from './context/display-completed';
import LoginProvider from './context/authorization';
import { Provider } from 'react-redux';

import createStore from './store';

import './styles/design.scss';

const store = createStore();

export default class App extends React.Component {
  render() {
    return (
      <ItemCountProvider>
        <DisplayCompletedProvider>
          <LoginProvider>
            <BrowserRouter>
              <Provider store={store}>
                <nav className="vertical" style={{textAlign: 'center'}} >
                  <ul>
                    <li><Link to="/" style={{width: "100%"}}>Local ToDo</Link></li>
                    <li><Link to="/connected" style={{width: "100%"}}>Connected ToDo</Link></li>
                  </ul>
                </nav>
                <Switch>
                  <Route path="/connected" component={ToDoConnected} />
                  <Route component={ToDo} />
                </Switch>
              </Provider>
            </BrowserRouter>
          </LoginProvider>
        </DisplayCompletedProvider>
      </ItemCountProvider>
    );
  }
}
