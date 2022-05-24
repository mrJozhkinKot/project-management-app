import jwt_decode from 'jwt-decode';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { globalSlice } from '../reducers/globalSlice';
import { usersAPI } from '../utils/usersService';
import { useAppDispatch } from './redux';

export interface DecodedTokenInterface {
  userId: string;
  login: string;
  iat: number;
}

export function useCheckCookiesExpired() {
  const [cookies, , deleteCookies] = useCookies(['token', 'name']);
  const { setToken, setIsAuth, setLogin, setUserId, setUserName } = globalSlice.actions;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!cookies.token) {
      deleteCookies('name');
      dispatch(setIsAuth(false));
      dispatch(setToken(''));
      dispatch(setUserId(''));
      dispatch(setLogin(''));
      dispatch(setUserName(''));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export function useSetCookiesName() {
  const [cookies, setCookies] = useCookies(['token', 'name']);
  const [getUser, {}] = usersAPI.useGetUserMutation();

  useEffect(() => {
    if (cookies.token && !cookies.name) {
      const decodedToken: DecodedTokenInterface = jwt_decode(cookies.token);
      getUser([cookies.token, decodedToken.userId])
        .unwrap()
        .then((res) => {
          if (res?.name) {
            setCookies('name', res.name);
          }
        });
    }
  }, [cookies, getUser, setCookies]);
}

export function useWatchCookiesToken() {
  const [cookies, setCookies, deleteCookies] = useCookies(['token', 'name']);
  const dispatch = useAppDispatch();
  const { setToken, setIsAuth, setLogin, setUserId, setUserName } = globalSlice.actions;

  useEffect(() => {
    if (!cookies.token) {
      deleteCookies('name');
      dispatch(setIsAuth(false));
      dispatch(setToken(''));
      dispatch(setUserId(''));
      dispatch(setLogin(''));
      dispatch(setUserName(''));
    }
    if (cookies.token) {
      const decodedToken: DecodedTokenInterface = jwt_decode(cookies.token);
      dispatch(setIsAuth(true));
      dispatch(setToken(cookies.token));
      dispatch(setUserId(decodedToken.userId));
      dispatch(setLogin(decodedToken.login));
      dispatch(setUserName(cookies.name));
    }
  }, [
    cookies,
    setCookies,
    deleteCookies,
    dispatch,
    setIsAuth,
    setLogin,
    setToken,
    setUserId,
    setUserName,
  ]);
}
