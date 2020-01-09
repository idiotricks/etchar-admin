export default class AuthService {
  constructor() {
    this.userKey = 'USER'
    this.token = '';
    this.userId = '';
    this.username = '';
    this.email = '';
  }

  saveAuth() {
    localStorage.setItem(this.userKey, JSON.stringify({
      'token': this.getToken(),
      'userId': this.getUserId(),
      'username': this.getUsername(),
      'email': this.getEmail()
    }));
  }

  fetchAuth() {
    const data = localStorage.getItem(this.userKey);
    if (data) {
      const dataJSON = JSON.parse(data);
      this.setToken(dataJSON.token);
      this.setUserId(dataJSON.userId);
      this.setUsername(dataJSON.username);
      this.setEmail(dataJSON.email);
    }
  }

  setToken(token) {
    this.token = token;
  }

  getToken(token) {
    return this.token;
  }

  setUserId(userId) {
    this.userId = userId;
  }

  getUserId() {
    return this.userId;
  }

  setUsername(username) {
    this.username = username;
  }

  getUsername() {
    return this.username;
  }

  setEmail(email) {
    this.email = email;
  }

  getEmail() {
    return this.email;
  }

  isAuthenticated() {
    this.fetchAuth();
    if (this.getUsername()
      && this.getToken()
      && this.getUserId()
      && this.getEmail()) {
        return true;
      }
    return false;
  }
}