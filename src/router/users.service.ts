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

// let token = localStorage.getItem('token');
// token = token === null ? null : token;

function getToken() {
  return localStorage.getItem('token');
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

function loginUsingToken(token: any) {
  console.log('Se llama a loginUsingToken con el token: ', token);
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
