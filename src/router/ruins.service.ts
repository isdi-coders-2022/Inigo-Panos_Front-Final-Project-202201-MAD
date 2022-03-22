import axios from 'axios';
import { RuinI } from '@/_helpers/interfaces';

const RUINS_API = 'http://localhost:4500/ruins';

export const ruinsServices = {
  createNewRuin,
  getAllRuins,
};
function createNewRuin(ruin: RuinI) {
  return axios.post(`${RUINS_API}/add`, ruin);
}

function getAllRuins() {
  console.log('Se ha llamado a getData de users.services con la dirección', `${RUINS_API}`);
  return axios.get(`${RUINS_API}`);
}
