import BaseService from "./BaseService";

import { API_BASE_URL_ENV } from "../jsx/common/common";

const apiEndpoint = API_BASE_URL_ENV() + "/profits";

export default class ProfitsService extends BaseService {
  constructor() {
    super(apiEndpoint);
  }
}
