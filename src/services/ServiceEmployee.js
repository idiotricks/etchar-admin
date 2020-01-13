import { BASE_URL } from '../env';
import Axios from 'axios';
import AuthService from './AuthService';

export default class ServiceEmployee {
  constructor() {
    this.baseURL = BASE_URL;
    this.http = Axios;
    this.authService = new AuthService();
  }

  list() {
    this.authService.fetchAuth();
    this.authService.setHeaders({
      'Authorization': `Token ${this.authService.getToken()}`,
    });
    return this.http.get(`${this.baseURL}/employees/`, {headers: this.authService.getHeaders()});
  }

  get(id) {
    this.authService.fetchAuth();
    this.authService.setHeaders({
      'Authorization': `Token ${this.authService.getToken()}`
    });
    return this.http.get(`${this.baseURL}/employees/${id}/`, {headers: this.authService.getHeaders()});
  }

  create() {
    this.authService.fetchAuth();
    this.authService.setHeaders({
      'Authorization': `Token ${this.authService.getToken()}`
    });
    return this.http.post(`${this.baseURL}/employees/`, {}, {headers: this.authService.getHeaders()});
  }

  update(id, data) {
    this.authService.fetchAuth();
    this.authService.setHeaders({
      'Authorization': `Token ${this.authService.getToken()}`,
      'Content-Type': 'application/json'
    });
    return this.http.patch(`${this.baseURL}/employees/${id}/`, data, {headers: this.authService.getHeaders()});
  }

  sanity(id) {
    this.authService.fetchAuth();
    this.authService.setHeaders({
      'Authorization': `Token ${this.authService.getToken()}`
    });
    return this.http.post(`${this.baseURL}/employees/${id}/sanity/`, null, {headers: this.authService.getHeaders()});
  }
}