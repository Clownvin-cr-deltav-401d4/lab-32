import React from 'react';
import cookie from 'react-cookies';
import jwt from 'jsonwebtoken';

export const LoginContext = React.createContext();

const API = process.env.REACT_APP_API;

export default class LoginProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      token: null,
      user: null,
      login: this.login,
      logout: this.logout,
      hasCapability: this.hasCapability,
    };
  }

  login = (username, password) => {
    fetch(`${API}/signin`, {
      mode: 'cors',
      method: 'post',
      cache: 'no-cache',
      headers: new Headers({
        'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
      })
    })
      .then(response => response.text())
      .then(token => this.validateToken(token))
      .catch(console.error);
  }

  validateToken = token => {
    try {
      let user = jwt.decode(token);
      this.setLoginState(token, user);
    }
    catch(e) {
      this.logout();
      console.error(e);
    }
  }

  hasCapability = capability => {
    return this.state.user && this.state.user.capabilities.includes(capability);
  }

  logout = () => {
    this.setLoginState(null, null);
  }

  setLoginState = (token, user) => {
    this.setState({ token, user });
    if (token)
      cookie.save('auth', token);
    else
      cookie.remove('auth');
  }

  componentDidMount() {
    const cookieToken = cookie.load('auth');
    this.validateToken(cookieToken);
  }

  render() {
    return (
      <LoginContext.Provider value={this.state}>
        {this.props.children}
      </LoginContext.Provider>
    )
  }
}