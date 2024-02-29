import BaseService from "./BaseService";
import { API_BASE_URL_ENV } from "../jsx/common/common";

const apiEndpoint = API_BASE_URL_ENV() + "/BranchesAndMarkets";

export default class BranchesAndMarketsService extends BaseService {
  constructor() {
    super(apiEndpoint);
  }
}
