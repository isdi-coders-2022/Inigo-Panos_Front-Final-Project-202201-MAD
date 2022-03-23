import Vuex from 'vuex';

import { shallowMount } from '@vue/test-utils';
import Login from '../../../src/components/Login.vue';

export const store = new Vuex.Store({
  modules: {
    account: {
      state: {},
      actions: {
        login: jest.fn(),
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
});
