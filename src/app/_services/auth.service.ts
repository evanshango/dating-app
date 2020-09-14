import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.apiUrl;
  jwtHelper = new JwtHelperService();
  decodedToken: any;

  constructor(private http: HttpClient) {
  }

  login(model: any) {
    return this.http.post(`${this.baseUrl}/auth/login`, model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('meet_up_token', user.token);
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
        }
      })
    );
  }

  register(model: any) {
    return this.http.post(`${this.baseUrl}/auth/register`, model);
  }

  loggedIn() {
    const token = localStorage.getItem('meet_up_token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
