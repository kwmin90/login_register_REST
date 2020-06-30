import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;

  constructor(private authService: AuthService) { }

  ngOnInit(){
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.isLoggedOut$ = this.authService.isLoggedOut;
  }

  logout(){
    this.authService.logout();
  }
}
