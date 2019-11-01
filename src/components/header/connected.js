import React, {useState} from 'react';

import useLogin from '../../hooks/useLogin';

import './header.scss';

const ConnectedHeader = props => {
  const login = useLogin();
  const [details, updateDetails] = useState({username: '', password: ''});

  const onSubmit = e => {
    e.preventDefault();
    login.login(details.username, details.password);
  }

  const updateUsername = e => {
    updateDetails({...details, username: e.target.value});
  }

  const updatePassword = e => {
    updateDetails({...details, password: e.target.value});
  }

  return (
    <header>
      {login.user ? (
        <>
          <h2>
            There are {props.count || 0} Items To Complete
          </h2>
          <button onClick={login.logout}>Logout</button>
        </>
      ) : (
        <>
          <h2>Please login</h2>
          <form id="login" onSubmit={onSubmit}>
            <input type="text" onChange={updateUsername} value={details.username} placeholder="Username" />
            <input type="password" onChange={updatePassword} value={details.password} placeholder="Password" />
            <input type="submit" value="Login" />
          </form>
        </>
      )}
      
    </header>
  );
};
export default ConnectedHeader;
