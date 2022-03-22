import { RuinI } from '@/_helpers/interfaces';
import { ruinsServices } from '../router/ruins.service';
import router from '../router/index';

const actions = {
  getAllRuins({ dispatch, commit }: { dispatch: any; commit: any }) {
    console.log('Se llama getAllRuins');

    ruinsServices.getAllRuins().then(
      (listOfRuinsData) => {
        commit('getAllRuinsSucess', listOfRuinsData);
        console.log(listOfRuinsData, ' listOfRuinsData en ruin.modules');
        router.push('/ruins');
      },

      (error) => {
        dispatch('alert/error', error, { root: true });
      },
    );
  },
};

const mutations = {
  getAllRuinsSucess(state: any, listOfRuinsData: any) {
    console.log(listOfRuinsData, ' listOfRuinsData');

    state.allRuinsData = [];

    listOfRuinsData.data.forEach((e: RuinI) => {
      state.allRuinsData.push(e);
    });

    console.log(state.allRuinsData, ' datos de un usuario traídos de getUsers');
  },
};

const getters = {
  listOfRuinsData(state: any) {
    return state.allRuinsData;
  },
};

export const ruins = {
  namespaced: true,
  actions,
  mutations,
  getters,
};
