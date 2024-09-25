
import BaseService from "./BaseService";
import { API_BASE_URL_ENV } from "../jsx/common/common";

const apiEndpoint = API_BASE_URL_ENV() + "/BoardOfDirectors/jobTitle";

export default class JobTitleService extends BaseService {
  constructor() {
    super(apiEndpoint);
  }
}
