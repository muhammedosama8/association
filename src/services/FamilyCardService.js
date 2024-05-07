import BaseService from "./BaseService";
import http from './HttpService'
import { API_BASE_URL_ENV } from "../jsx/common/common";

const apiEndpoint = API_BASE_URL_ENV() + "/familyCard";

export default class FamilyCardService extends BaseService {
  constructor() {
    super(apiEndpoint);
  }

  updateFamilyMember(id, data) {
    return http.put(`${apiEndpoint}/familyMember/${id}`, data);
  }
}