import Vuex from 'vuex';
import Vue from 'vue';
import { shallowMount, mount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import { routes } from '@/router';
import RuinDetail from '@/components/RuinDetail.vue';

export const store = new Vuex.Store({
  modules: {
    ruins: {
      namespaced: true,
      state: {
        allRuinsData: jest.fn(),
      },
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
      getters: {
        ruinDetails: jest.fn().mockReturnValue({ comments: [{ author_id: { _id: '11111' } }] }),
        listOfRuinsData: jest.fn(),
      },
    },
    account: {
      namespaced: true,
      state: {},
      actions: {
        getUserData: jest.fn(),
      },
      getters: {
        userData: jest.fn().mockReturnValue({
          userFound: {
            _id: '11111',
          },
        }),
      },
    },
  },
});

const router = createRouter({
  history: createWebHistory(),
  routes,
});

describe('RuinDetail.vue', () => {
  test('Test test', () => {
    const mockedRuinDetail = jest.fn();
    const MockedgetAllRuins = jest.fn();
    const wrapper = shallowMount(RuinDetail, {
      global: { plugins: [store, router] },
      methods: { getRuinDetails: mockedRuinDetail, getAllRuins: MockedgetAllRuins },
    });

    expect(wrapper.vm).toBeDefined();
    expect(mockedRuinDetail).toHaveBeenCalled();
    expect(MockedgetAllRuins).toHaveBeenCalled();
  });
  test('Test that function addCommentToRuin is called on handleSubmit', () => {
    const wrapper = shallowMount(RuinDetail, {
      global: { plugins: [store, router] },
    });

    jest.spyOn(wrapper.vm, 'addCommentToRuin');

    wrapper.vm.handleSubmit();

    expect(wrapper.vm).toBeDefined();
    expect(wrapper.vm.addCommentToRuin).toHaveBeenCalled();
  });
});

describe('RuinDetail.vue', () => {
  it('renders props.msg when passed', () => {
    const wrapper = shallowMount(RuinDetail, {
      global: { plugins: [store, router] },
    });
    expect(wrapper.text()).toMatch('Detalles de la ruina');
  });
  it('has a button', () => {
    const wrapper = shallowMount(RuinDetail, {
      global: { plugins: [store, router] },
    });
    expect(wrapper.find('button').exists()).toBe(true);
  });
});

describe('RuinDetails.vue -> buttons', () => {
  it('Calls add to favorite function', async () => {
    const wrapper = shallowMount(RuinDetail, {
      global: { plugins: [store, router] },
    });

    jest.spyOn(wrapper.vm, 'ruinFavorites');
    expect(wrapper.find('button').exists()).toBe(true);
    const button = wrapper.find('.favoriteButton');
    await button.trigger('click');
    expect(wrapper.vm).toBeDefined();
    expect(wrapper.vm.ruinFavorites).toHaveBeenCalled();
  });
  it('Calls add to visited function', async () => {
    const wrapper = shallowMount(RuinDetail, {
      global: { plugins: [store, router] },
    });

    jest.spyOn(wrapper.vm, 'ruinVisited');
    expect(wrapper.find('button').exists()).toBe(true);
    const button = wrapper.find('.visitedButton');
    await button.trigger('click');

    const _id = jest.fn().mockResolvedValue('1111');
    expect(wrapper.vm).toBeDefined();
    expect(wrapper.vm.ruinVisited).toHaveBeenCalled();
  });
  it('Calls deleteRuin function', async () => {
    const wrapper = mount(RuinDetail, {
      global: { plugins: [store, router] },
      data() {
        return {
          userData: {
            userFound: {
              isAdmin: true,
            },
          },
        };
      },
    });

    jest.spyOn(wrapper.vm, 'deleteRuinById');
    expect(wrapper.find('button').exists()).toBe(true);
    const button = wrapper.find('#deleteRuinButton');

    expect(wrapper.find('#deleteRuinButton').isVisible()).toBe(true);
    await button.trigger('click');
    expect(wrapper.vm).toBeDefined();
    expect(wrapper.vm.deleteRuinById).toHaveBeenCalled();
  });
  it('Calls deleteCommentFromRuin function', async () => {
    const wrapper = mount(RuinDetail, {
      global: { plugins: [store, router] },
      data() {
        return {
          ruinInfo: {
            comments: {
              author_id: { _id: '11111' },
              ruin_id: '2222',
              text: 'Hola',
            },
          },
        };
      },
    });

    jest.spyOn(wrapper.vm, 'deleteRuinComment');

    expect(wrapper.find('.deleteCommentButton').exists()).toBe(true);

    const button = wrapper.find('.deleteCommentButton');

    await button.trigger('click');

    expect(wrapper.vm).toBeDefined();
    expect(wrapper.vm.deleteRuinComment).toHaveBeenCalled();
  });
});
