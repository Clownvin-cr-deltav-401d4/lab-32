import {useContext} from 'react';
import {LoginContext} from '../context/authorization';

export default function useLogin() {
  return useContext(LoginContext);
}