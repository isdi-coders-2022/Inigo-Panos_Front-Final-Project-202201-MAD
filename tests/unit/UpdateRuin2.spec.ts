import Vuex from 'vuex';
import { shallowMount, mount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import { routes } from '@/router';
import UpdateRuin from '@/components/UpdateRuin.vue';

export const store = new Vuex.Store({
  modules: {
    account: {
      state: {},
      getters: {
        userData: jest.fn(),
      },
    },
    ruins: {
      state: { Ruinname: 'NombreRuina' },
      actions: {
        modifyExistingRuin: jest.fn(),
        getRuinDetails: jest.fn(),
      },
      getters: {
        ruinDetails: jest.fn().mockReturnValue({ testR: 'test' }),
      },
    },
  },
});

const router = createRouter({
  history: createWebHistory(),
  routes,
});

describe('UpdateRuin.vue', () => {
  test('Test test', () => {
    const mockedGetRuinDetails = jest.fn();
    const wrapper = shallowMount(UpdateRuin, {
      global: { plugins: [store, router] },
      methods: { getRuinDetails: mockedGetRuinDetails },
    });

    expect(wrapper.vm).toBeDefined();
    expect(mockedGetRuinDetails).toHaveBeenCalled();
  });
  test('Test test 2', () => {
    const wrapper = shallowMount(UpdateRuin, {
      global: { plugins: [store, router] },
    });

    jest.spyOn(wrapper.vm, 'modifyExistingRuin');

    wrapper.vm.handleSubmit();
    expect(wrapper.vm).toBeDefined();
    expect(wrapper.vm.modifyExistingRuin).toHaveBeenCalled();
  });
  //  test('Test test 3', () => {
  //    const wrapper = shallowMount(UpdateRuin, {
  //      global: { plugins: [store, router] },
  //    });

  //    jest.spyOn(wrapper.vm, 'functionInsidePepeWatch');

  //    wrapper.vm.pepe = "newPepeValue"

  //    expect(wrapper.vm).toBeDefined();
  //    expect(wrapper.vm.functionInsidePepeWatch).toHaveBeenCalled();
  //  });
});
