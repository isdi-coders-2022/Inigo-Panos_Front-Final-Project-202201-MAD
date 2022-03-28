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
    console.log('Se llama getAllRuins');

    ruinsServices.getAllRuins().then(
      (listOfRuinsData) => {
        commit('getAllRuinsSucess', listOfRuinsData);
        console.log(listOfRuinsData, ' listOfRuinsData en ruin.modules');
      },

      (error) => {
        dispatch('alert/error', error, { root: true });
      },
    );
  },

  getRuinDetails({ dispatch, commit }: { dispatch: any; commit: any }, id: string) {
    console.log('Se llama getRuinsDetails');

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
    console.log('Ruina llegada a createNewRuin en ruins.modules: ', ruin);
    // commit('createNewRuinRequest', ruin);
    console.log(ruin, 'DESPUÉS DEL COMMIT');

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
    console.log('HOLA');
    ruinsServices.updateRuin(payload).then(
      (listOfRuinsData: any) => {
        commit('modifyRuinSuccess', listOfRuinsData);
        router.push('/ruins');
        location.reload();

        // dispatch('alert/success', 'Ruin modification successful', { root: true });
      },
      (error) => {
        dispatch('alert/error', error, { root: true });
      },
    );
  },

  deleteRuin({ dispatch, commit }: { dispatch: any; commit: any }, id: string) {
    console.log('Se ha llamado a delete ruin en el ruins.modules');

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
        console.log('Se ha añadido/quitado de favoritos con éxito!');
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
        console.log('Se ha añadido/quitado de favoritos con éxito!');
      },
      (error) => {
        dispatch('alert/error', error, { root: true });
        console.log('Se ha añadido/quitado de visitados con éxito!');
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
        console.log('Se ha borrado el comentario con éxito!');
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
    console.log('Se ha modificado el favorito de forma exitosa');
  },

  addRuinToVisitedSuccess(state: any, ruinData: any) {
    console.log('Se ha modificado el visitado de forma exitosa');
  },

  removedCommentFromRuinSuccess(state: any, ruinDetails: any) {
    console.log('Se ha borrado el comentario de forma exitosa');
    const newRuinData = ruinDetails.data.response;
    state.ruin = newRuinData;
    console.log(newRuinData, 'TRAS BORRAR COMENTARIO');
  },

  addCommentToRuinSuccess(state: any, ruinDetails: any) {
    console.log('Se ha añadido el comentario de forma exitosa: ', ruinDetails.data.response);

    state.ruin = ruinDetails.data.response;
    console.log('Datos de la ruina, ', state.ruin); // No están populados los datos
  },

  getAllRuinsSucess(state: any, listOfRuinsData: any) {
    console.log(listOfRuinsData, ' listOfRuinsData');
    state.allRuinsData = [];

    listOfRuinsData.data.forEach((e: CreateRuinI) => {
      console.log('POLLAS EN VINAGRE');
      state.allRuinsData.push(e); // No funciona con el datainteface preguntar a Moi
    });

    console.log(state.allRuinsData, ' datos de las ruinas');
  },

  getRuinDetailsSuccess(state: any, ruinDetails: any) {
    state.ruin = ruinDetails.data;
    console.log('Datos de getRuinDetailsSuccess: ', state.ruin);
  },

  deleteRuinSuccess(state: any, listOfRuinsData: any) {
    console.log(listOfRuinsData, ' listOfRuinsData tras borrar');
    state.allRuinsData = [];
    console.log(state.allRuinsData, ' ruinas después de borrar una');
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
  },

  modifyRuinSuccess(state: any, listOfRuinsData: any) {
    state.listOfRuinsData = [];
  },
};

const getters = {
  listOfRuinsData(state: any) {
    console.log(state.allRuinsData);
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
