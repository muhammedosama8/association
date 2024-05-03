import BaseService from "./BaseService";

import { API_BASE_URL_ENV } from "../jsx/common/common";

const apiEndpoint = API_BASE_URL_ENV() + "/diwan";

export default class DiwansService extends BaseService {
  constructor() {
    super(apiEndpoint);
  }
}
