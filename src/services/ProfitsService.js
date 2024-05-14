import BaseService from "./BaseService";
import http from './HttpService'
import { API_BASE_URL_ENV } from "../jsx/common/common";

const apiEndpoint = API_BASE_URL_ENV() + "/profit";

export default class ProfitsService extends BaseService {
  constructor() {
    super(apiEndpoint);
  }

  setProfitDate(data){
    return http.post(`${apiEndpoint}/profitDate`, data)
  }

  getProfitDate(){
    return http.get(`${apiEndpoint}/profitDate`)
  }
}
