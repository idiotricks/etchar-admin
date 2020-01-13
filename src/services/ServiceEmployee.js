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
}