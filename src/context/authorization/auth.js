import useLogin from '../../hooks/useLogin';

export default function Auth(props) {
  const login = useLogin();

  if (login.user && login.user.capabilities.includes(props.type)) {
    return props.children;
  }
  return null;
}