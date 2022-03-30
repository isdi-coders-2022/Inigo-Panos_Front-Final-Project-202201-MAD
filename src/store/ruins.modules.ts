import { CreateRuinI } from '@/_helpers/interfaces';
import { ruinsServices } from '../router/ruins.service';
import router from '../router/index';

interface RuinsStateI {
  allRuinsData: [];
  ruin: {
    _id: '';
    comments: [];
    description: '';
    images: [];
    location: '';
    name: '';
    score: 0;
  };
}

const actions = {
  getAllRuins({ dispatch, commit }: { dispatch: any; commit: any }) {
    ruinsServices.getAllRuins().then(
      (listOfRuinsData) => {
        commit('getAllRuinsSucess', listOfRuinsData);
      },

      (error) => {
        dispatch('alert/error', error, { root: true });
      },
    );
  },

  getRuinDetails({ dispatch, commit }: { dispatch: any; commit: any }, id: string) {
    ruinsServices.getRuinDetails(id).then(
      (ruinsDetails) => {
        commit('getRuinDetailsSuccess', ruinsDetails);
      },

      (error) => {
        dispatch('alert/error', error, { root: true });
      },
    );
  },

  createNewRuin({ dispatch, commit }: { dispatch: any; commit: any }, ruin: CreateRuinI) {
    ruinsServices.createNewRuin(ruin).then(
      (ruinData: any) => {
        commit('createNewRuinSuccess', ruinData);
        router.push('/ruins');
        dispatch('alert/success', 'Ruin creation successful', { root: true });
      },
      (error) => {
        commit('createNewRuinFailure', error);
        dispatch('alert/error', error, { root: true });
      },
    );
  },

  modifyExistingRuin({ dispatch, commit }: { dispatch: any; commit: any }, payload: any) {
    ruinsServices.updateRuin(payload).then(
      (listOfRuinsData: any) => {
        commit('modifyRuinSuccess', listOfRuinsData);
        router.push('/ruins');
        location.reload();
      },
      (error) => {
        dispatch('alert/error', error, { root: true });
      },
    );
  },

  deleteRuin({ dispatch, commit }: { dispatch: any; commit: any }, id: string) {
    ruinsServices.deleteRuin(id).then(
      (listOfRuinsData: any) => {
        commit('deleteRuinSuccess', listOfRuinsData);
        router.push('/ruins');
        dispatch('alert/success', 'Ruin deletion successful', { root: true });
      },
      (error) => {
        commit('createNewRuinFailure', error);
        dispatch('alert/error', error, { root: true });
      },
    );
  },

  addRuinToFavorites({ dispatch, commit }: { dispatch: any; commit: any }, id: string) {
    ruinsServices.addToFavoritesToggle(id).then(
      (ruinData: any) => {
        commit('addRuinToFavoritesSuccess', ruinData);
      },
      (error) => {
        dispatch('alert/error', error, { root: true });
      },
    );
  },

  addRuinToVisited({ dispatch, commit }: { dispatch: any; commit: any }, id: string) {
    ruinsServices.addToVisitedToggle(id).then(
      (ruinData: any) => {
        commit('addRuinToVisitedSuccess', ruinData);
      },
      (error) => {
        dispatch('alert/error', error, { root: true });
      },
    );
  },

  addCommentToRuin({ dispatch, commit }: { dispatch: any; commit: any }, payload: any) {
    ruinsServices.newCommentOnRuin(payload).then(
      (ruinDetails: any) => {
        commit('addCommentToRuinSuccess', ruinDetails);
        dispatch('alert/success', 'Comment creation successful', { root: true });
      },
      (error) => {
        commit('createNewRuinFailure', error);
        dispatch('alert/error', error, { root: true });
      },
    );
  },

  deleteCommentFromRuin({ dispatch, commit }: { dispatch: any; commit: any }, payload: any) {
    ruinsServices.deleteComment(payload).then(
      (ruinDetails: any) => {
        commit('removedCommentFromRuinSuccess', ruinDetails);
        dispatch('alert/success', 'Comment deletion successful', { root: true });
      },
      (error) => {
        commit('createNewRuinFailure', error);
        dispatch('alert/error', error, { root: true });
      },
    );
  },
};

const mutations = {
  addRuinToFavoritesSuccess(state: any, ruinData: any) {
    console.log('Ruina añadida a visitados con éxito');
  },

  addRuinToVisitedSuccess(state: any, ruinData: any) {
    console.log('Ruina añadida a visitados con éxito');
  },

  removedCommentFromRuinSuccess(state: any, ruinDetails: any) {
    const newRuinData = ruinDetails.data.response;
    state.ruin = newRuinData;
  },

  addCommentToRuinSuccess(state: any, ruinDetails: any) {
    state.ruin = ruinDetails.data.response;
  },

  getAllRuinsSucess(state: any, listOfRuinsData: any) {
    state.allRuinsData = [];

    listOfRuinsData.data.forEach((e: CreateRuinI) => {
      state.allRuinsData.push(e); // No funciona con el datainteface preguntar a Moi
    });
  },

  getRuinDetailsSuccess(state: any, ruinDetails: any) {
    state.ruin = ruinDetails.data;
  },

  deleteRuinSuccess(state: any, listOfRuinsData: any) {
    state.allRuinsData = [];
  },

  createNewRuinRequest(state: any) {
    state.status = { registering: true };
  },
  createNewRuinSuccess(state: any) {
    state.status = {};
  },
  createNewRuinFailure(state: any) {
    console.log('Error, no ha sido posible crear una nueva ruina');
  },

  modifyRuinSuccess(state: any, listOfRuinsData: any) {
    state.listOfRuinsData = [];
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
