import Vuex from 'vuex';
import { shallowMount, mount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import { routes } from '@/router';
import CreateRuin from '@/components/CreateRuin.vue';

export const store = new Vuex.Store({
  modules: {
    account: {
      state: {},
      getters: {
        userData: jest.fn(),
        userInformation: jest.fn(),
      },
    },
    ruins: {
      state: { Ruinname: 'NombreRuina' },
      actions: {
        createNewRuin: jest.fn(),
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

describe('On mounted.vue', () => {
  test('Test test', () => {
    const wrapper = shallowMount(CreateRuin, {
      global: { plugins: [store, router] },
    });

    expect(wrapper.vm).toBeDefined();
  });
  test('Test that function is called on handleSubmit', () => {
    const wrapper = shallowMount(CreateRuin, {
      global: { plugins: [store, router] },
    });

    jest.spyOn(wrapper.vm, 'createNewRuin');

    wrapper.vm.handleSubmit();
    expect(wrapper.vm).toBeDefined();
    expect(wrapper.vm.createNewRuin).toHaveBeenCalled();
  });

  test('renders props.msg when passed', () => {
    const wrapper = shallowMount(CreateRuin, {
      global: { plugins: [store, router] },
    });
    expect(wrapper.text()).toMatch('Añada una nueva localización');
  });
});
