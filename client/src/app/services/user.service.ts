import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private uri = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  findUser() {
    return this.http.get(`${this.uri}/api/user`);
  }
  register(user: User) {
    return this.http.post(`${this.uri}/api/register`, user).subscribe();
  }
  capitalizeFirstLetter(x: string) {
    return x.charAt(0).toUpperCase() + x.slice(1);
  }
}