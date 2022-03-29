import { UserI } from '@/_helpers/interfaces';
import { usersService } from '../router/users.service';
import router from '../router/index';

const actions = {
  login({ dispatch, commit }: { dispatch: any; commit: any }, user: UserI) {
    commit('loginRequest', {});
    commit('loginRequest', user);

    usersService.login(user).then(
      (userData) => {
        localStorage.setItem('id', JSON.stringify(userData.data.userId));
        localStorage.setItem('token', userData.data.token);
        commit('loginSuccess', userData.data);
        router.push('/userData');
      },
      (error) => {
        commit('loginFailure', error);
        dispatch('alert/error', error, { root: true });
      },
    );
  },

  loginWithToken({ dispatch, commit }: { dispatch: any; commit: any }, token: any) {
    usersService.loginUsingToken(token).then(
      (userData) => {
        commit('loginSuccess', userData.data);
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
      },

      (error) => {
        dispatch('alert/error', error, { root: true });
      },
    );
  },

  logout({ commit }: { commit: any }) {
    localStorage.setItem('id', '');
    usersService.logout();
    commit('logout', {});
  },

  register({ dispatch, commit }: { dispatch: any; commit: any }, user: any) {
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
  },

  loginSuccess(state: any, user: any) {
    state.status = { loggedIn: true };

    state.userInformation = user;
    state.userLoggedStatus = { loggedIn: true };
  },

  loginRequest(state: any, user: any) {
    state.status = { loggingIn: true };
    state.user = user;
  },

  loginFailure(state: any) {
    state.status = {};
    state.user = null;
  },
  loginFailureToken(state: any) {
    state.status = {};
    state.user = null;
  },
  logout(state: any) {
    state.status = {};
    state.user = null;
    state.userInformation = {};
    state.userLoggedStatus = { loggedIn: false };
  },
  registerRequest(state: any) {
    state.status = { registering: true };
  },
  registerSuccess(state: any) {
    state.status = {};
  },
  registerFailure(state: any) {
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
  userLoggedStatus(state: any) {
    return state.userLoggedStatus;
  },
};

export const account = {
  namespaced: true,
  actions,
  mutations,
  getters,
};
