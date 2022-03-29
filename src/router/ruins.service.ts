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
  return axios.patch(`${RUINS_API}/${payload.ruin._id}`, payload.ruin, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
}

export function newCommentOnRuin(payload: any) {
  return axios.patch(`${RUINS_API}/${payload.ruinId}/comment`, payload, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
}

export function deleteComment(payload: any) {
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
  return axios.post(`${RUINS_API}/add`, ruin, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
}

export function deleteRuin(id: string) {
  return axios.delete(`${RUINS_API}/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
}

export function getAllRuins() {
  return axios.get(`${RUINS_API}`);
}

export function getRuinDetails(id: string) {
  return axios.get(`${RUINS_API}/${id}`);
}
