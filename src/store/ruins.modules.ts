import { CreateRuinI } from '@/_helpers/interfaces';
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

  getRuinDetails({ dispatch, commit }: { dispatch: any; commit: any }, id: string) {
    console.log('Se llama getRuinsDetails');

    ruinsServices.getRuinDetails(id).then(
      (listOfRuinsData) => {
        commit('getRuinDetailsSuccess', listOfRuinsData);
        console.log(listOfRuinsData, ' listOfRuinsData en ruin.modules');
      },

      (error) => {
        dispatch('alert/error', error, { root: true });
      },
    );
  },

  createNewRuin({ dispatch, commit }: { dispatch: any; commit: any }, ruin: CreateRuinI) {
    console.log('Ruina llegada a createNewRuin en ruins.modules: ', ruin);
    // commit('createNewRuinRequest', ruin);
    console.log(ruin, 'DESPUÉS DEL COMMIT');

    ruinsServices.createNewRuin(ruin).then(
      (ruinData: any) => {
        commit('createNewRuinSuccess', ruinData);
        router.push('/ruins');
        setTimeout(() => {
          dispatch('alert/success', 'Ruin creation successful', { root: true });
        });
      },
      (error) => {
        commit('createNewRuinFailure', error);
        dispatch('alert/error', error, { root: true });
      },
    );
  },
};

const mutations = {
  getAllRuinsSucess(state: any, listOfRuinsData: any) {
    console.log(listOfRuinsData, ' listOfRuinsData');

    state.allRuinsData = [];

    listOfRuinsData.data.forEach((e: CreateRuinI) => {
      state.allRuinsData.push(e);
    });

    console.log(state.allRuinsData, ' datos de un usuario traídos de getUsers');
  },

  getRuinDetailsSuccess(state: any, ruinDetails: any) {
    console.log(ruinDetails, ' detalles de ruina en mutación');
    state.ruin = ruinDetails.data;
  },

  createNewRuinRequest(state: any) {
    console.log(state.status);
    state.status = { registering: true };
  },
  createNewRuinSuccess(state: any) {
    console.log(state.status);
    state.status = {};
  },
  createNewRuinFailure(state: any) {
    console.log(state.status);
    state.status = {};
  },
};

const getters = {
  listOfRuinsData(state: any) {
    return state.allRuinsData;
  },
  ruinDetails(state: any) {
    return state.ruin;
  },
};

export const ruins = {
  namespaced: true,
  actions,
  mutations,
  getters,
};
