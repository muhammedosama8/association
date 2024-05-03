import BaseService from "./BaseService";
import http from './HttpService'

import { API_BASE_URL_ENV } from "../jsx/common/common";

const apiEndpoint = API_BASE_URL_ENV() + "/notification";
const apiSendEndpoint = API_BASE_URL_ENV() + "/notification/send";

export default class NotificationService extends BaseService {
    constructor() {
        super(apiEndpoint);
    }
    send(id){
        return http.post(`${apiSendEndpoint}/${id}`);
    }
}
