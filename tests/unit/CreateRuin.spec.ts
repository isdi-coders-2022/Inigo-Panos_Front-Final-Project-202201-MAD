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
      },
    },
    ruins: {
      state: { Ruinname: 'NombreRuina' },
      actions: {
        createNewRuin: jest.fn(),
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

describe('CreateRuin.vue', () => {
  test('Test test', () => {
    const mockedCreateRuin = jest.fn();
    const wrapper = shallowMount(CreateRuin, {
      global: { plugins: [store, router] },
      methods: { getRuinDetails: mockedCreateRuin },
    });

    expect(wrapper.vm).toBeDefined();
    expect(mockedCreateRuin).toHaveBeenCalled();
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
