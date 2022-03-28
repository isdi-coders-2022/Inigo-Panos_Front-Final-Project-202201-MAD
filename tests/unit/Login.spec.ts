import Vuex from 'vuex';

import { shallowMount } from '@vue/test-utils';
import Login from '@/components/Login.vue';

export const store = new Vuex.Store({
  modules: {
    account: {
      state: {},
      actions: {
        login: jest.fn(),
        logout: jest.fn(),
        dispatch: jest.fn(),
      },
    },
  },
});

describe('LoginPage.vue', () => {
  it('renders props.msg when passed', () => {
    const wrapper = shallowMount(Login, { global: { plugins: [store] } });
    expect(wrapper.text()).toMatch('userName');
    expect(wrapper.text()).toMatch('Password');
  });
  it('has a button', () => {
    const wrapper = shallowMount(Login, { global: { plugins: [store] } });
    expect(wrapper.find('button').exists()).toBe(true);
  });

  describe('When userName and password are introduced', () => {
    test('It calls login function from modules', async () => {
      const wrapper = shallowMount(Login, {
        global: {
          plugins: [store],
        },
      });

      jest.spyOn(wrapper.vm, 'login');
      wrapper.vm.userName = 'test';
      wrapper.vm.password = 'test';

      const formToBeSubmited = wrapper.find('form');

      formToBeSubmited.trigger('submit');

      expect(wrapper.vm.login).toHaveBeenCalled();
    });
  });
});
