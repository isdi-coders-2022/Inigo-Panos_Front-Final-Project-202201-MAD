import Vuex from 'vuex';

import { shallowMount, mount } from '@vue/test-utils';
import RuinList from '@/components/RuinList.vue';

export const store = new Vuex.Store({
  modules: {
    account: {
      state: {},
    },
    ruins: {
      state: { ruinName: 'Ruina' },
      actions: {
        getAllRuins: jest.fn(),
      },
    },
  },
});

describe('RuinList.vue', () => {
  it('renders props.msg when passed', () => {
    const wrapper = shallowMount(RuinList, { global: { plugins: [store] } });
    expect(wrapper.text()).toMatch('Lista de ruinas');
  });

  // describe('Mounted Lifecycle', () => {
  //   test('Validate data and function call during mount', () => {
  //     const wrapper = mount(RuinList, {
  //       global: {
  //         plugins: [store],
  //       },
  //     });
  //     const mockUno = jest.spyOn(wrapper.vm, 'getAllRuins');

  //     expect(wrapper.vm.getAllRuins).toHaveBeenCalled();
  //   });
  // });

  // describe('When the component is mounted', () => {
  //   test('getAllRuins is called', () => {
  //     const wrapper = mount(RuinList, {
  //       global: {
  //         plugins: [store],
  //       },
  //     });

  //     const spy = jest.spyOn(wrapper.vm, 'getAllRuins');

  //     wrapper.mounted();
  //     expect(spy).toHaveBeenCalled();
  //     // expect(wrapper.vm.getAllRuins).toHaveBeenCalled();
  //   });
  // });

  describe('When the component is loaded with store info', () => {
    test('It renders a ruins name', async () => {
      const wrapper = mount(RuinList, {
        global: {
          plugins: [store],
        },
      });

      wrapper.vm.ruinName = 'Ruina';
    });
  });
});
