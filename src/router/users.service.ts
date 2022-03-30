import axios from 'axios';
import { UserLoginI, UserRegisterI } from '@/_helpers/interfaces';

const USERS_API = 'http://localhost:4500';

export const usersService = {
  login,
  logout,
  register,
  getData,
  loginUsingToken,
};

function getToken() {
  return localStorage.getItem('token');
}

export function register(user: UserRegisterI) {
  return axios.post(`${USERS_API}/users/register`, user);
}

export function login(user: UserLoginI) {
  return axios.post(`${USERS_API}/users/login`, user);
}

export function loginUsingToken(token: any) {
  return axios.post(
    `${USERS_API}/users/login/token`,
    {},
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    },
  );
}

export function logout() {
  localStorage.removeItem('token');
}
export function getData(id: any) {
  return axios.get(`${USERS_API}/users/${id}`);
}
