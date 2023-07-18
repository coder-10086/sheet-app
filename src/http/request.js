import axios from 'axios';

let token = sessionStorage.getItem('token')
let orgID = sessionStorage.getItem('orgID')

const api = axios.create({
  baseURL: '',
  timeout: 5000,
  method: 'POST',
  headers: {
    'method': 'POST',
    'channel': 'zmd',
    'jgbh': orgID || 3301000001,
    'login-token': token || '56f4fd57cebfc053f3d297845acbe34f27:zmd',
    'm-sy-appid': 2019082217092434,
    'm-sy-service': 'HZZDZSZX01',
    'm-sy-token': '32d1be1a-daa2-413e-b40c-27db136cdfd5',
    'm-sy-version': '1.0.1',
    'qycode': 'HZZDZSZX01',
    'zjbzxbm': 'HZZDZSZX01',
    'zzbs': orgID || '3301000001',
    'zzjgdmz': 'HZZDZSZX01'
  },
});


export const post = (url, params) => {
  return api.post(url, params)
    .then(res => [null, res])
    .catch(error => [error, null])
};
