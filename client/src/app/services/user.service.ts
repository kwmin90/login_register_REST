import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private uri = 'http://localhost:3000';

  constructor(private http: HttpClient, private router: Router) { }

  findUser(){
    return this.http.get<User>(`${this.uri}/api/users`);
  }
  register(user: User){
    return this.http.post<any>(`${this.uri}/api/register`, user);
    
  }
}
