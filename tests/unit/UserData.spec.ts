import Vuex from 'vuex';

import { shallowMount, mount } from '@vue/test-utils';
import UserData from '@/components/UserData.vue';

export const store = new Vuex.Store({
  modules: {
    account: {
      namespaced: true,
      state: {},
      actions: {
        logout: jest.fn(),
        loginWithToken: jest.fn(),
      },
    },
  },
});

describe('UserData.vue', () => {
  it('has a ruter-link', () => {
    const wrapper = shallowMount(UserData, { global: { plugins: [store] } });
    expect(wrapper.find('router-link').exists()).toBe(true);
  });

  test('LoginWIthToken is called', () => {
    const mockedLoginWithToken = jest.fn();
    const wrapper = mount(UserData, {
      methods: { loginWithToken: mockedLoginWithToken },
      global: {
        plugins: [store],
      },
    });
    localStorage.setItem('token', '1111');
    // jest.spyOn(window.localStorage, 'getItem');
    // window.localStorage.getItem = jest.fn();
    expect(window.localStorage.getItem('token')).toBe('1111');
    expect(mockedLoginWithToken).toHaveBeenCalled();
    localStorage.clear();
  });

  test('When clicking the logout button, it logs out', () => {
    const wrapper = mount(UserData, {
      global: {
        plugins: [store],
      },
    });

    jest.spyOn(wrapper.vm, 'logout');

    const logoutButton = wrapper.find('router-link');
    logoutButton.trigger('click');

    expect(wrapper.vm.logout).toHaveBeenCalled();
  });
});
