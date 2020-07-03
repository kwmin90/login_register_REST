import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  user: any;

  constructor(private userService: UserService, private authService: AuthService) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.userService.findUser()
      .subscribe((someuser: any) => {
        this.user = someuser.data;
        this.user.firstName = this.userService.capitalizeFirstLetter(this.user.firstName);
        this.user.lastName = this.userService.capitalizeFirstLetter(this.user.lastName);
      });
      this.getRefreshToken();
  }
  getRefreshToken(){
    this.authService.refresh().subscribe();
  }

}
