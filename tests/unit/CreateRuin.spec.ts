import Vuex from 'vuex';
import { shallowMount, mount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import { routes } from '@/router';
import CreateRuin from '@/components/CreateRuin.vue';

jest.mock('firebase/storage', () => ({
  ...jest.requireActual('firebase/storage'),
  ref: jest.fn().mockReturnValue({}),
  uploadBytes: jest.fn().mockResolvedValue({}),
  getDownloadURL: jest.fn().mockResolvedValue('test.com/pepe.jpg'),
  handleImageChange: jest.fn(),
}));

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

    wrapper.vm.handleSubmit();
    jest.spyOn(wrapper.vm, 'createNewRuin');
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
