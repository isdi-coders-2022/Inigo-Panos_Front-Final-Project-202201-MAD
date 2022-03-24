import axios from 'axios';
import { CreateRuinI } from '@/_helpers/interfaces';

const RUINS_API = 'http://localhost:4500/ruins';

export const ruinsServices = {
  createNewRuin,
  getAllRuins,
  getRuinDetails,
};

function createNewRuin(ruin: CreateRuinI) {
  console.log(
    'Se ha llamado a createNewRuin de ruin.services con la dirección',
    `${RUINS_API}/add`,
  );
  console.log(ruin);
  return axios.post(`${RUINS_API}/add`, ruin);
}

function getAllRuins() {
  console.log('Se ha llamado a getData de ruins.service con la dirección', `${RUINS_API}`);
  return axios.get(`${RUINS_API}`);
}

function getRuinDetails(id: string) {
  console.log('Se ha llamado a getData de ruins.service con la dirección', `${RUINS_API}`);
  return axios.get(`${RUINS_API}/${id}`);
}
