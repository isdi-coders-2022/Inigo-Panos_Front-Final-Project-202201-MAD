import axios from 'axios';
import { CreateRuinI } from '@/_helpers/interfaces';

const RUINS_API = 'http://localhost:4500/ruins';

export const ruinsServices = {
  createNewRuin,
  getAllRuins,
  getRuinDetails,
  deleteRuin,
};

function getToken() {
  return localStorage.getItem('token');
}

function createNewRuin(ruin: CreateRuinI) {
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

function deleteRuin(id: string) {
  return axios.delete(`${RUINS_API}/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
}

function getAllRuins() {
  console.log('Se ha llamado a getData de ruins.service con la dirección', `${RUINS_API}`);
  return axios.get(`${RUINS_API}`);
}

function getRuinDetails(id: string) {
  console.log('Se ha llamado a getData de ruins.service con la dirección', `${RUINS_API}`);
  return axios.get(`${RUINS_API}/${id}`);
}
