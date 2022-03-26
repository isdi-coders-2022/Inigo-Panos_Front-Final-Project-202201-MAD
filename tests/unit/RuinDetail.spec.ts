import Vuex from 'vuex';

import { shallowMount, mount } from '@vue/test-utils';
import RuinDetail from '@/components/RuinDetail.vue';

export const store = new Vuex.Store({
  modules: {
    ruins: {
      state: {},
      actions: {
        getRuinDetails: jest.fn(),
        getAllRuins: jest.fn(),
        deleteRuin: jest.fn(),
        updateRuin: jest.fn(),
        addRuinToFavorites: jest.fn(),
        addRuinToVisited: jest.fn(),
        addCommentToRuin: jest.fn(),
        deleteCommentFromRuin: jest.fn(),
      },
    },
    account: {
      state: {},
      actions: {
        getUserData: jest.fn(),
      },
    },
  },
});

describe('RuinDetail.vue', () => {
  it('renders props.msg when passed', () => {
    const wrapper = shallowMount(RuinDetail, { global: { plugins: [store] } });
    expect(wrapper.text()).toMatch('Nombre:');
    expect(wrapper.text()).toMatch('Localización:');
    expect(wrapper.text()).toMatch('Imágenes:');
    expect(wrapper.text()).toMatch('Descripción:');
  });
  it('has a button', () => {
    const wrapper = shallowMount(RuinDetail, { global: { plugins: [store] } });
    expect(wrapper.find('button').exists()).toBe(true);
  });
});
