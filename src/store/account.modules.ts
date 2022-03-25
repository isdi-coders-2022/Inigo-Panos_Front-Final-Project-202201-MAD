import { UserI } from '@/_helpers/interfaces';
import { usersService } from '../router/users.service';
import router from '../router/index';

// const user = JSON.parse(localStorage.getItem('user')!);
// const state = user ? { status: { loggedIn: true }, user } : { status: {}, user: null };

const actions = {
  login({ dispatch, commit }: { dispatch: any; commit: any }, user: UserI) {
    commit('loginRequest', {});
    commit('loginRequest', user);

    usersService.login(user).then(
      (userData) => {
        localStorage.setItem('id', JSON.stringify(userData.data.userId));
        localStorage.setItem('token', userData.data.token);
        commit('loginSuccess', userData.data);
        console.log('UserData tras hacer login', userData.data);
        router.push('/userData');
      },
      (error) => {
        commit('loginFailure', error);
        dispatch('alert/error', error, { root: true });
      },
    );
  },

  loginWithToken({ dispatch, commit }: { dispatch: any; commit: any }, token: any) {
    console.log(token, ' token enviado desde loginWithToken');
    usersService.loginUsingToken(token).then(
      (userData) => {
        console.log(userData, ' USERDATA de loginWithToken');
        commit('loginSuccess', userData.data);
        console.log('UserData tras hacer login', userData.data);
      },
      (error) => {
        commit('loginFailureToken', error);
        dispatch('alert/error', error, { root: true });
      },
    );
  },

  getUserData({ dispatch, commit }: { dispatch: any; commit: any }, id: any) {
    usersService.getData(id).then(
      (userData) => {
        commit('getUserSuccess', userData);
        console.log(userData, ' userData en accountModules');
      },

      (error) => {
        dispatch('alert/error', error, { root: true });
      },
    );
  },

  logout({ commit }: { commit: any }) {
    localStorage.setItem('id', '');
    usersService.logout();
    commit('logout');
  },

  register({ dispatch, commit }: { dispatch: any; commit: any }, user: any) {
    console.log('Usuario llegado a register en account.modules: ', user);
    commit('registerRequest', user);

    usersService.register(user).then(
      (userData: any) => {
        commit('registerSuccess', userData);
        router.push('/login');
        setTimeout(() => {
          // display success message after route change completes
          dispatch('alert/success', 'Registration successful', { root: true });
        });
      },
      (error) => {
        commit('registerFailure', error);
        dispatch('alert/error', error, { root: true });
      },
    );
  },
};

const mutations = {
  getUserSuccess(state: any, user: any) {
    console.log(user, ' user');

    state.userInformation = {
      userName: user.data.userName,
      favorites: user.data.favorites,
      visited: user.data.visited,
      comments: user.data.comments,
      isAdmin: user.data.isAdmin,
    };

    state.user.token = localStorage.getItem('token');
    state.user.userId = localStorage.getItem('id');
    state.user.userId = JSON.parse(state.user.userId);

    console.log(
      state.userInformation,
      ' y ',
      state.user,
      ' datos de un usuario traídos de getUsers',
    );
  },

  loginSuccess(state: any, user: any) {
    state.status = { loggedIn: true };
    console.log(user, ' user');
    state.userInformation = user;

    state.user.token = localStorage.getItem('token');
    state.user.userId = localStorage.getItem('id');
    state.user.userId = JSON.parse(state.user.userId);

    console.log(state.user, ' estado del usuario ya logeado');
  },

  loginRequest(state: any, user: any) {
    console.log(state.status, 'estado login request');
    state.status = { loggingIn: true };
    state.user = user;
  },

  loginFailure(state: any) {
    console.log(state.status, 'estado login failure');
    state.status = {};
    state.user = null;
  },
  loginFailureToken(state: any) {
    console.log(state.status, 'estado login failure tras llamar con token');
    state.status = {};
    state.user = null;
  },
  logout(state: any) {
    state.status = {};
    state.user = null;
  },
  registerRequest(state: any) {
    console.log(state.status);
    state.status = { registering: true };
  },
  registerSuccess(state: any) {
    console.log(state.status);
    state.status = {};
  },
  registerFailure(state: any) {
    console.log(state.status);
    state.status = {};
  },
};

const getters = {
  userInfo(state: any) {
    return state.user;
  },
  userData(state: any) {
    return state.userInformation;
  },
};

export const account = {
  namespaced: true,
  actions,
  mutations,
  getters,
};
