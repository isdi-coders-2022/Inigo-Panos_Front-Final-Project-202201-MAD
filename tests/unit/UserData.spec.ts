import Vuex from 'vuex';

import { shallowMount, mount } from '@vue/test-utils';
import UserData from '@/components/UserData.vue';

export const store = new Vuex.Store({
  modules: {
    account: {
      state: {},
      actions: {
        getUserData: jest.fn(),
        logout: jest.fn(),
      },
    },
  },
});

describe('UserData.vue', () => {
  it('has a ruter-link', () => {
    const wrapper = shallowMount(UserData, { global: { plugins: [store] } });
    expect(wrapper.find('router-link').exists()).toBe(true);
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
