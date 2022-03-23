import axios from 'axios';
import { UserLoginI, UserRegisterI } from '@/_helpers/interfaces';

const USERS_API = 'http://localhost:4500';

export const usersService = {
  login,
  logout,
  register,
  getData,
};

// let token = localStorage.getItem('token');
// token = token === null ? null : token;

let tokenUser = localStorage.getItem('id');
if (tokenUser) {
  tokenUser = JSON.parse(tokenUser);
}

function handleResponse(response: any) {
  return response.text().then((text: string) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        location.reload();
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}

function register(user: UserRegisterI) {
  return axios.post(`${USERS_API}/users/register`, user);
}

function login(user: UserLoginI) {
  return axios.post(`${USERS_API}/users/login`, user);
}

function logout() {
  // remove user from local storage to log user out. Yo tengo id?
  localStorage.removeItem('user');
}

function getData(id: any) {
  console.log(
    'Se ha llamado a getData de users.services con la dirección',
    `${USERS_API}/users/${id}`,
  );
  return axios.get(`${USERS_API}/users/${id}`);
}
