import Vue from 'vue';
import Vuex from 'vuex';

import { account } from './account.modules';
import { ruins } from './ruins.modules';

export const store = new Vuex.Store({
  modules: {
    account,
    ruins,
  },
});
