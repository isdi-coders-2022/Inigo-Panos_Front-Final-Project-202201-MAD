import axios from 'axios';
import { UserLoginI, UserRegisterI } from '@/_helpers/interfaces';

const USERS_API = 'http://localhost:4500';

export const usersService = {
  login,
  logout,
  register,
  // getData,
};

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
  // const requestOptions = {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(user),
  // };

  // return fetch(`${USERS_API}/users/register`, requestOptions).then(handleResponse);
  return axios.post(`${USERS_API}/users/register`, user);
}

function login(user: UserLoginI) {
  // const requestOptions = {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ userName, password }),
  // };
  // console.log(USERS_API, 'prueba de conexión a la base de datos', requestOptions);
  // return fetch(`${USERS_API}/users/login`, requestOptions)
  //   .then(handleResponse)
  //   .then((user) => {
  //     // login successful if there's a jwt token in the response
  //     if (user.token) {
  //       // store user details and jwt token in local storage
  //       // to keep user logged in between page refreshes
  //       localStorage.setItem('user', JSON.stringify(user));
  //     }

  //     return user;
  //   });
  return axios.post(`${USERS_API}/users/login`, user);
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
}

// function getData(data: object) {}
