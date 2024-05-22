import BaseService from "./BaseService";
import { API_BASE_URL_ENV } from "../jsx/common/common";

const apiEndpoint = API_BASE_URL_ENV() + "/ActivitiesAndEvents";

export default class ActivitiesAndEventsService extends BaseService {
  constructor() {
    super(apiEndpoint);
  }
}
