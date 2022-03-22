import { usersService } from '../router/users.service';
import router from '../router/index';

// const user = JSON.parse(localStorage.getItem('user')!);
// const state = user ? { status: { loggedIn: true }, user } : { status: {}, user: null };

const actions = {
  login(
    { dispatch, commit }: { dispatch: any; commit: any },
    { userName, password }: { userName: string; password: string },
  ) {
    commit('loginRequest', { userName });

    usersService.login(userName, password).then(
      (userData) => {
        console.log(userData.token.token);
        commit('loginSuccess', userData);
        router.push('/');
      },
      (error) => {
        commit('loginFailure', error);
        dispatch('alert/error', error, { root: true });
      },
    );
  },

  logout({ commit }: { commit: any }) {
    usersService.logout();
    commit('logout');
  },

  register({ dispatch, commit }: { dispatch: any; commit: any }, user: any) {
    console.log('Usuario llegado a register en account.modules: ', user);
    commit('registerRequest', user);

    usersService.register(user).then(
      (userData) => {
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
  loginRequest(state: any, user: any) {
    console.log(state.status, 'estado login request');
    state.status = { loggingIn: true };
    state.user = user;
  },
  loginSuccess(state: any, user: any) {
    console.log(state.status, 'estado login success');
    state.status = { loggedIn: true };
    state.user = user;
  },
  loginFailure(state: any) {
    console.log(state.status, 'estado login failure');
    state.status = {};
    state.user = null;
  },
  logout(state: any) {
    state.status = {};
    state.user = null;
  },
  registerRequest(state: any, user: any) {
    console.log(state.status);
    state.status = { registering: true };
  },
  registerSuccess(state: any, user: any) {
    console.log(state.status);
    state.status = {};
  },
  registerFailure(state: any, user: any) {
    console.log(state.status);
    state.status = {};
  },
};

export const account = {
  namespaced: true,
  actions,
  mutations,
};
