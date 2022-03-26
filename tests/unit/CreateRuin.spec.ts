import Vuex from 'vuex';

import { shallowMount, mount } from '@vue/test-utils';
import CreateRuin from '@/components/CreateRuin.vue';

export const store = new Vuex.Store({
  modules: {
    account: {
      state: {
        ruinData: {},
      },
    },
    ruins: {
      state: { ruinName: 'Ruina' },
      actions: {
        createNewRuin: jest.fn(),
      },
    },
  },
});

export const storeMock = Object.freeze({
  state: {},
  actions: {},
  getters: {
    'account/userData': {
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6Ik1lbCIsInVzZXJJZCI6IjYyMzIxMzk4MDA4MWRhMjk0NmRlMmJmZCIsImlhdCI6MTY0ODI5MjAxMH0.24rKKqK-tuqka_g6bbA5PO8MeXzmIXIbTxtv3S5SF6Q',
      userFound: { userName: 'Mel', isAdmin: true },
    },
  },
});

const route = {
  path: '/',
  hash: '',
  params: { id: '123' },
};

describe('RuinList.vue', () => {
  it('renders props.msg when passed', () => {
    const wrapper = mount(CreateRuin, { global: { mocks: [route, storeMock], plugins: [store] } });
    expect(wrapper.text()).toMatch('Añada una nueva localización');
  });
});
