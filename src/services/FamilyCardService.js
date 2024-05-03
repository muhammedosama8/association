import BaseService from "./BaseService";
import { API_BASE_URL_ENV } from "../jsx/common/common";

const apiEndpoint = API_BASE_URL_ENV() + "/family-card";

export default class FamilyCardService extends BaseService {
  constructor() {
    super(apiEndpoint);
  }
}