import { BASE_URL } from '../env';
import Axios from 'axios';
import AuthService from './AuthService';

export default class ServiceIncome {
  constructor() {
    this.baseURL = BASE_URL;
    this.http = Axios;
    this.authService = new AuthService();
  }

  list() {
    this.authService.fetchAuth();
    this.authService.setHeaders({
      'Authorization': `Token ${this.authService.getToken()}`
    });
    return this.http.get(`${this.baseURL}/incomes/`, {headers: this.authService.getHeaders()});
  }

  search(params){
    this.authService.fetchAuth();
    this.authService.setHeaders({
      'Authorization': `Token ${this.authService.getToken()}`
    });
    return this.http.get(`${this.baseURL}/incomes/`, {
      params: params,
      headers: this.authService.getHeaders()
    });
  }

  get(id) {
    this.authService.fetchAuth();
    this.authService.setHeaders({
      'Authorization': `Token ${this.authService.getToken()}`
    });
    return this.http.get(`${this.baseURL}/incomes/${id}/`, {headers: this.authService.getHeaders()});
  }

  create() {
    this.authService.fetchAuth();
    this.authService.setHeaders({
      'Authorization': `Token ${this.authService.getToken()}`
    });
    return this.http.post(`${this.baseURL}/incomes/`, null, {headers: this.authService.getHeaders()});
  }

  update(id, data) {
    this.authService.fetchAuth();
    this.authService.setHeaders({
      'Authorization': `Token ${this.authService.getToken()}`,
      'Content-Type': 'application/json'
    });
    return this.http.patch(`${this.baseURL}/incomes/${id}/`, data, {headers: this.authService.getHeaders()});
  }

  remove(id) {
    this.authService.fetchAuth();
    this.authService.setHeaders({
      'Authorization': `Token ${this.authService.getToken()}`
    });
    return this.http.delete(`${this.baseURL}/incomes/${id}/`, {headers: this.authService.getHeaders()});
  }

  draft(id) {
    this.authService.fetchAuth();
    this.authService.setHeaders({
      'Authorization': `Token ${this.authService.getToken()}`
    });
    return this.http.post(`${this.baseURL}/incomes/${id}/draft/`, null, {headers: this.authService.getHeaders()});
  }

  publish(id) {
    this.authService.fetchAuth();
    this.authService.setHeaders({
      'Authorization': `Token ${this.authService.getToken()}`
    });
    return this.http.post(`${this.baseURL}/incomes/${id}/publish/`, null, {headers: this.authService.getHeaders()});
  }
}