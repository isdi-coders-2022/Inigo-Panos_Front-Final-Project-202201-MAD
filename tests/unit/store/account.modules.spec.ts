import { createStore } from 'vuex';

test('Login', () => {
  const store = createStore({
    state: {
      userName: '',
    },
    mutations: {
      increment(state) {
        state.userName = 'pepe';
      },
    },
  });

  store.commit('increment');

  expect(store.state.userName).toBe('pepe');
});
