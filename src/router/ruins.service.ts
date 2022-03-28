import axios from 'axios';
import { CreateRuinI } from '@/_helpers/interfaces';

const RUINS_API = 'http://localhost:4500/ruins';

export const ruinsServices = {
  createNewRuin,
  getAllRuins,
  getRuinDetails,
  deleteRuin,
  updateRuin,
  addToFavoritesToggle,
  addToVisitedToggle,
  newCommentOnRuin,
  deleteComment,
};

export function getToken() {
  return localStorage.getItem('token');
}

export function updateRuin(payload: any) {
  console.log(payload, ' Payload recibido en updateRuin, servicio de ruinas');
  return axios.patch(`${RUINS_API}/${payload.ruin._id}`, payload.ruin, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
}

export function newCommentOnRuin(payload: any) {
  console.log(payload, ' Payload recibido en addComment, servicio de ruinas');
  return axios.patch(`${RUINS_API}/${payload.ruinId}/comment`, payload, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
}

export function deleteComment(payload: any) {
  console.log('Payload en deleteComment: ', payload);
  return axios.delete(`${RUINS_API}/${payload.ruinId}/comment/${payload.commentId}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
}

export function addToFavoritesToggle(id: string) {
  return axios.patch(`${RUINS_API}/${id}/user/favorites`, id, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
}
export function addToVisitedToggle(id: string) {
  return axios.patch(`${RUINS_API}/${id}/user/visited`, id, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
}

export function createNewRuin(ruin: CreateRuinI) {
  console.log(
    'Se ha llamado a createNewRuin de ruin.services con la dirección',
    `${RUINS_API}/add`,
  );
  console.log(ruin);

  return axios.post(`${RUINS_API}/add`, ruin, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
}

export function deleteRuin(id: string) {
  console.log('Se llama a deleteRuin con: ', `${RUINS_API}/${id}`);

  return axios.delete(`${RUINS_API}/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
}

export function getAllRuins() {
  console.log('Se ha llamado a getData de ruins.service con la dirección', `${RUINS_API}`);
  return axios.get(`${RUINS_API}`);
}

export function getRuinDetails(id: string) {
  console.log('Se ha llamado a getData de ruins.service con la dirección', `${RUINS_API}`);
  return axios.get(`${RUINS_API}/${id}`);
}
