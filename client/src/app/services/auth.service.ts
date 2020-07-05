import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './../models/user.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<User>;
  private currentUser: Observable<User>;
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private loggedOut: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  private uri = 'http://localhost:3000';

  constructor(private http: HttpClient, private router: Router) { 
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    if(localStorage.getItem('currentUser')!=null){
      this.loggedIn.next(true);
      this.loggedOut.next(false);
    }
  }

  login(email: string, password: string) {
    return this.http.post(`${this.uri}/api/login`, {email, password})
    .subscribe((result)=>{
      const token = JSON.parse(JSON.stringify(result));
      if(token.idToken && token.data){
        localStorage.setItem('currentUser', JSON.stringify(token.data.email));
          localStorage.setItem('id_token', JSON.stringify(token.idToken)); 
          this.currentUserSubject.next(token.data);
          this.loggedIn.next(true);
          this.loggedOut.next(false);
      }else{
        return false;
      }
      return true;
    });
  }
  refresh(){
    return this.http.get(`${this.uri}/api/refresh_token`)
    .subscribe((result)=>{
      const data = JSON.parse(JSON.stringify(result));
      if(data.idToken){
        localStorage.setItem('id_token', JSON.stringify(data.idToken));
      }else return false;
    });
}
  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('id_token');
    this.loggedIn.next(false);
    this.loggedOut.next(true);
    this.currentUserSubject.next(null);
    this.router.navigate(['/']);
  }
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }
  public get currentUserValue(): User{
    return this.currentUserSubject.value;
  }
  get isLoggedOut(){
    return this.loggedOut.asObservable();
  }
}
