import BaseService from "./BaseService";

import { API_BASE_URL_ENV } from "../jsx/common/common";

const apiEndpoint = API_BASE_URL_ENV() + "/products";

export default class ProductsService extends BaseService {
  constructor() {
    super(apiEndpoint);
  }
}