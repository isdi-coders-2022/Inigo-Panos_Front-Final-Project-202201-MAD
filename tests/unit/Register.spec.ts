import Vuex from 'vuex';
import { shallowMount, mount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import { routes } from '@/router';
import Register from '@/components/Register.vue';

export const store = new Vuex.Store({
  modules: {
    account: {
      state: {},
      actions: {
        register: jest.fn(),
        dispatch: jest.fn(),
      },
    },
  },
});

const router = createRouter({
  history: createWebHistory(),
  routes,
});

describe('RegisterPage.vue', () => {
  test('routing', () => {
    const wrapper = mount(Register, {
      global: {
        plugins: [router],
      },
    });
    expect(wrapper.html()).toContain('');
  });

  it('renders props.msg when passed', () => {
    const wrapper = shallowMount(Register, { global: { plugins: [store] } });
    expect(wrapper.text()).toMatch('userName');
    expect(wrapper.text()).toMatch('Password');
  });
  it('has a button', () => {
    const wrapper = shallowMount(Register, { global: { plugins: [store] } });
    expect(wrapper.find('button').exists()).toBe(true);
  });

  describe('When userName and password are introduced', () => {
    test('It calls Register function from modules', async () => {
      const wrapper = mount(Register, {
        global: {
          plugins: [store],
        },
      });

      jest.spyOn(wrapper.vm, 'register');
      wrapper.vm.userName = 'test';
      wrapper.vm.password = 'test';

      const formToBeSubmited = wrapper.find('form');

      formToBeSubmited.trigger('submit');

      expect(wrapper.vm.register).toHaveBeenCalled();
    });
  });
});
