import BaseService from "./BaseService";
import http from './HttpService'
import { API_BASE_URL_ENV } from "../jsx/common/common";

const apiEndpoint = API_BASE_URL_ENV() + "/familyCardRequest";

export default class FamilyCardRequestService extends BaseService {
  constructor() {
    super(apiEndpoint);
  }

  create(data) {
    return http.post(`${apiEndpoint}/admin`, data);
  }

  updateStatus(id, data) {
    return http.put(`${apiEndpoint}/status/${id}`, data);
  }
}