import Vue from 'vue';
import Vuex from 'vuex';

import { account } from './account.modules';

export const store = new Vuex.Store({
  modules: {
    account,
  },
});
