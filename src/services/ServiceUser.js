import { BASE_URL } from "../env";
import Axios from "axios";

export default class ServiceUser {
  constructor() {
    this.baseURL = BASE_URL;
    this.http = Axios;
  }

  authLogin(username, password) {
    return this.http.post(`${this.baseURL}/users/login/`, {username, password});
  }

  authRegister(username, email, password) {
    return this.http.post(`${this.baseURL}/users/register/`, {
      username,
      email,
      password
    });
  }
}